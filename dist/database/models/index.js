'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var models = {
  Board: _connection2.default.import('./board'),
  Column: _connection2.default.import('./column'),
  Card: _connection2.default.import('./card'),
  User: _connection2.default.import('./user'),
  VoteCard: _connection2.default.import('./vote_card'),
  StarBoard: _connection2.default.import('./star_board'),
  Comment: _connection2.default.import('./comment')
};

Object.keys(models).forEach(function (modelName) {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = _connection2.default;
models.Sequelize = _sequelize2.default;

exports.default = models;