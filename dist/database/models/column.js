'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {
    var Column = sequelize.define('column', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        order_num: DataTypes.INTEGER
    });

    Column.associate = function (models) {
        // 1:M
        Column.belongsTo(models.Board, {
            foreignKey: {
                name: 'boardId',
                field: 'board_id'
            }
        });
    };

    return Column;
};