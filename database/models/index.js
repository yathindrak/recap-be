import Sequelize from 'sequelize';
import dbConn from '../connection';

const models = {
  Board: dbConn.import('./board'),
  Column: dbConn.import('./column'),
  Card: dbConn.import('./card'),
  User:dbConn.import('./user'),
  VoteCard: dbConn.import('./vote_card'),
  StarBoard: dbConn.import('./star_board'),
  Comment: dbConn.import('./comment'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = dbConn;
models.Sequelize = Sequelize;

export default models;
