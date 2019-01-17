import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { PubSub } from 'apollo-server';
import { createServer } from 'http';
import jwt from 'jsonwebtoken';
import models from './database/models/index';
import { refreshTokens } from './auth';
require('dotenv').config();
const history = require('connect-history-api-fallback');
// merger typeDefs and resolvers
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const app = express();
app.use(history());
export const pubsub = new PubSub();

const eraseDatabaseOnSync = false;

// app.use(cors('http://localhost:8080/'));
app.use(cors('*'));

const PORT = 4000;

const addUser = async (req, res, next) => {
    const token = req.headers['x-token'];
    if (token) {
        try {
            const { user } = jwt.verify(token, process.env.SECRET); //This is like=>  {"useridentity":"3928562347"}
            req.user = user;
        } catch (err) {
            const refreshToken = req.headers['x-refresh-token'];
            const newTokens = await refreshTokens(token, refreshToken, models, process.env.SECRET, process.env.SECRET2);
            if (newTokens.token && newTokens.refreshToken) {
                res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
                res.set('x-token', newTokens.token);
                res.set('x-refresh-token', newTokens.refreshToken);
            }
            req.user = newTokens.user;
        }
    }
    next();
};

app.use(addUser);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// Apollo server
const server = new ApolloServer({
    schema,
    context: ({ req, connection }) => {
        if (connection) {
            return {
                models,
                user: connection.context.user,
            };
        }
        return {
            models,
            user: req.user,
            SECRET: process.env.SECRET,
            SECRET2: process.env.SECRET2,
        };
    },
    subscriptions: {
        onConnect: async ({ token, refreshToken }) => {
            console.log('Socket Connected');
            if (token && refreshToken) {
                let user = {};
                try {
                    ({ user } = jwt.verify(token, process.env.SECRET));
                } catch (err) {
                    const newTokens = await refreshTokens(token, refreshToken, models, process.env.SECRET, process.env.SECRET2);
                    ({ user } = newTokens);
                }
                return { models, user };
            }
            return { models };
        },
    }
});

server.applyMiddleware({ app });

// serve front end in prod
// app.use(express.static(path.join(__dirname, 'dist-fe')));
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'dist-fe', 'index.html'));
// });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

models.sequelize.sync({force: eraseDatabaseOnSync}).then(() => {
    httpServer.listen(PORT);
});
