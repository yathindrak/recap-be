'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {
    var VoteCard = sequelize.define('vote', {
        is_voted: DataTypes.BOOLEAN,
        boardId: DataTypes.INTEGER
    });

    return VoteCard;
};