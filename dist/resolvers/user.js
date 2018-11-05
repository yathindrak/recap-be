'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _auth = require('../auth');

exports.default = {
    Query: {
        getUser: function getUser(parent, _ref, _ref2) {
            var id = _ref.id;
            var models = _ref2.models;
            return models.User.findOne({ where: { id: id } });
        },
        allUsers: function allUsers(parent, args, _ref3) {
            var models = _ref3.models;
            return models.User.findAll();
        }
    },
    Mutation: {
        login: function login(parent, _ref4, _ref5) {
            var useridentity = _ref4.useridentity;
            var models = _ref5.models,
                SECRET = _ref5.SECRET,
                SECRET2 = _ref5.SECRET2;
            return (0, _auth.tryLogin)(useridentity, models, SECRET, SECRET2);
        }
    }
};