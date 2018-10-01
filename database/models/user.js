export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            useridentity: {
                type: DataTypes.STRING,
                primaryKey: true,
                unique: true,
            },
        },
    );

    User.associate = (models) => {
        User.belongsToMany(models.Card, {
            through: models.VoteCard,
            foreignKey: {
                name: 'useridentity',
                field: 'useridentity',
            },
        });

        User.belongsToMany(models.Board, {
            through: models.StarBoard,
            foreignKey: {
                name: 'useridentity',
                field: 'useridentity',
            },
        });
        User.belongsToMany(models.Card, {
            unique: false,
            through: {
               model: models.Comment,
               unique: false
            },
            foreignKey: {
                name: 'useridentity',
                field: 'useridentity',
            },
        });
    };

    // User.associate = (models) => {
    //     User.belongsToMany(models.Team, {
    //         through: 'member',
    //         foreignKey: {
    //             name: 'userId',
    //             field: 'user_id',
    //         },
    //     });
    //     // N:M
    //     User.belongsToMany(models.Channel, {
    //         through: 'channel_member',
    //         foreignKey: {
    //             name: 'userId',
    //             field: 'user_id',
    //         },
    //     });
    // };

    return User;
};
