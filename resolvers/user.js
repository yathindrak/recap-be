import { tryLogin } from '../auth';

export default {
    Query: {
        getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
        allUsers: (parent, args, { models }) => models.User.findAll(),
    },
    Mutation: {
        login: (parent, { useridentity }, { models, SECRET, SECRET2 }) =>
            tryLogin(useridentity, models, SECRET, SECRET2),
    },
};
