'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {
    var StarBoard = sequelize.define('star_board', {
        is_voted: DataTypes.BOOLEAN
    });

    return StarBoard;
};