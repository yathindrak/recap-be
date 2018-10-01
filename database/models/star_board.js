export default (sequelize, DataTypes) => {
    const StarBoard = sequelize.define('star_board', {
        is_voted: DataTypes.BOOLEAN,
    });


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

    return StarBoard;
};
