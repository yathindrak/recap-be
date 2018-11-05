'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pubsub = undefined;

var _apolloServerExpress = require('apollo-server-express');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mergeGraphqlSchemas = require('merge-graphql-schemas');

var _apolloServer = require('apollo-server');

var _http = require('http');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _index = require('./database/models/index');

var _index2 = _interopRequireDefault(_index);

var _auth = require('./auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('dotenv').config();

// merger typeDefs and resolvers
var typeDefs = (0, _mergeGraphqlSchemas.mergeTypes)((0, _mergeGraphqlSchemas.fileLoader)(_path2.default.join(__dirname, './schema')));
var resolvers = (0, _mergeGraphqlSchemas.mergeResolvers)((0, _mergeGraphqlSchemas.fileLoader)(_path2.default.join(__dirname, './resolvers')));

var app = (0, _express2.default)();
var pubsub = exports.pubsub = new _apolloServer.PubSub();

var eraseDatabaseOnSync = false;

// app.use(cors('http://localhost:8080/'));
app.use((0, _cors2.default)('*'));

var PORT = 4000;

var addUser = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var token, _jwt$verify, user, refreshToken, newTokens;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        token = req.headers['x-token'];

                        if (!token) {
                            _context.next = 15;
                            break;
                        }

                        _context.prev = 2;
                        _jwt$verify = _jsonwebtoken2.default.verify(token, process.env.SECRET), user = _jwt$verify.user; //This is like=>  {"useridentity":"3928562347"}

                        req.user = user;
                        _context.next = 15;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](2);
                        refreshToken = req.headers['x-refresh-token'];
                        _context.next = 12;
                        return (0, _auth.refreshTokens)(token, refreshToken, _index2.default, process.env.SECRET, process.env.SECRET2);

                    case 12:
                        newTokens = _context.sent;

                        if (newTokens.token && newTokens.refreshToken) {
                            res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
                            res.set('x-token', newTokens.token);
                            res.set('x-refresh-token', newTokens.refreshToken);
                        }
                        req.user = newTokens.user;

                    case 15:
                        next();

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[2, 7]]);
    }));

    return function addUser(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

app.use(addUser);

var schema = (0, _apolloServerExpress.makeExecutableSchema)({
    typeDefs: typeDefs,
    resolvers: resolvers
});

// Apollo server
var server = new _apolloServerExpress.ApolloServer({
    schema: schema,
    context: function context(_ref2) {
        var req = _ref2.req,
            connection = _ref2.connection;

        if (connection) {
            return {
                models: _index2.default,
                user: connection.context.user
            };
        }
        return {
            models: _index2.default,
            user: req.user,
            SECRET: process.env.SECRET,
            SECRET2: process.env.SECRET2
        };
    },
    subscriptions: {
        onConnect: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref4) {
                var token = _ref4.token,
                    refreshToken = _ref4.refreshToken;

                var user, _jwt$verify2, newTokens;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                console.log('Socket Connected');

                                if (!(token && refreshToken)) {
                                    _context2.next = 15;
                                    break;
                                }

                                user = {};
                                _context2.prev = 3;
                                _jwt$verify2 = _jsonwebtoken2.default.verify(token, SECRET);
                                user = _jwt$verify2.user;
                                _context2.next = 14;
                                break;

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2['catch'](3);
                                _context2.next = 12;
                                return (0, _auth.refreshTokens)(token, refreshToken, _index2.default, process.env.SECRET, process.env.SECRET2);

                            case 12:
                                newTokens = _context2.sent;
                                user = newTokens.user;

                            case 14:
                                return _context2.abrupt('return', { models: _index2.default, user: user });

                            case 15:
                                return _context2.abrupt('return', { models: _index2.default });

                            case 16:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, undefined, [[3, 8]]);
            }));

            return function onConnect(_x4) {
                return _ref3.apply(this, arguments);
            };
        }()
    }
});

server.applyMiddleware({ app: app });

var httpServer = (0, _http.createServer)(app);
server.installSubscriptionHandlers(httpServer);

_index2.default.sequelize.sync({ force: eraseDatabaseOnSync }).then(function () {
    httpServer.listen(PORT);
});