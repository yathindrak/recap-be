export default (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        boardId: DataTypes.INTEGER,
        message: DataTypes.STRING,
    });

    return Comment;
};
