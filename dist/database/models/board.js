'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {
    var Board = sequelize.define('board', {
        name: {
            type: DataTypes.STRING,
            unique: true
        },

        description: DataTypes.STRING

    });

    Board.associate = function (models) {
        Board.belongsToMany(models.User, {
            through: models.StarBoard,
            foreignKey: {
                name: 'boardId',
                field: 'board_id'
            }
        });
    };
    return Board;
};