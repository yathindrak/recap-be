export default (sequelize, DataTypes) => {
    const VoteCard = sequelize.define('vote', {
        is_voted: DataTypes.BOOLEAN,
        boardId: DataTypes.INTEGER,
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

    return VoteCard;
};
