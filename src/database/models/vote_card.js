export default (sequelize, DataTypes) => {
    const VoteCard = sequelize.define('vote', {
        is_voted: DataTypes.BOOLEAN,
        boardId: DataTypes.INTEGER,
    });

    return VoteCard;
};
