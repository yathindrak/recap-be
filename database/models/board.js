export default (sequelize, DataTypes) => {
    const Board = sequelize.define('board', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            // validate: {
            //     isAlphanumeric: {
            //         args: true,
            //         msg: 'The board name can only contain letters and numbers',
            //     },
            //     len: {
            //         args: [3, 10],
            //         msg: 'The board needs to be between 3 and 10 characters long',
            //     },
            // },
        },

        description: DataTypes.STRING,

    });

    Board.associate = (models) => {
        Board.belongsToMany(models.User, {
            through: models.StarBoard,
            foreignKey: {
                name: 'boardId',
                field: 'board_id',
            },
        });
    };

    // Board.associate = (models) => {
    //     // 1:M
    //     Board.belongsTo(models.Team, {
    //         foreignKey: {
    //             name: 'teamId',
    //             field: 'team_id',
    //         },
    //     });
    //     // N:M
    //     Board.belongsToMany(models.User, {
    //         through: 'channel_member',
    //         foreignKey: {
    //             name: 'channelId',
    //             field: 'channel_id',
    //         },
    //     });
    // };

    return Board;
};
