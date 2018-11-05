export default (sequelize, DataTypes) => {
    const Column = sequelize.define('column', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        order_num: DataTypes.INTEGER
    });

    Column.associate = (models) => {
        // 1:M
        Column.belongsTo(models.Board, {
            foreignKey: {
                name: 'boardId',
                field: 'board_id',
            },
        });
    };

    return Column;
};
