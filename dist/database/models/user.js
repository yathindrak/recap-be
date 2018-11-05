'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {
    var User = sequelize.define('user', {
        useridentity: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true
        }
    });

    User.associate = function (models) {
        User.belongsToMany(models.Card, {
            through: models.VoteCard,
            foreignKey: {
                name: 'useridentity',
                field: 'useridentity'
            }
        });

        User.belongsToMany(models.Board, {
            through: models.StarBoard,
            foreignKey: {
                name: 'useridentity',
                field: 'useridentity'
            }
        });
        User.belongsToMany(models.Card, {
            unique: false,
            through: {
                model: models.Comment,
                unique: false
            },
            foreignKey: {
                name: 'useridentity',
                field: 'useridentity'
            }
        });
    };

    return User;
};