export default (sequelize, DataTypes) => {
    const Board = sequelize.define('board', {
        name: {
            type: DataTypes.STRING,
            unique: true,
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
    return Board;
};
