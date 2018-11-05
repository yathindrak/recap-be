export default (sequelize, DataTypes) => {
    const Card = sequelize.define('card', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        order_num: DataTypes.INTEGER
    });

    Card.associate = (models) => {
        // 1:M
        Card.belongsTo(models.Column, {
            foreignKey: {
                name: 'columnId',
                field: 'column_id',
            },
        });
        Card.belongsToMany(models.User, {
            through: models.VoteCard,
            foreignKey: {
                name: 'cardId',
                field: 'card_id',
            },
        });
        Card.belongsToMany(models.User, {
            unique: false,
            through: {
                model: models.Comment,
                unique: false
            },
            foreignKey: {
                name: 'cardId',
                field: 'card_id'
            },
        });
    };

    return Card;
};
