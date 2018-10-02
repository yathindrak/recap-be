export default (sequelize, DataTypes) => {
    const StarBoard = sequelize.define('star_board', {
        is_voted: DataTypes.BOOLEAN,
    });

    return StarBoard;
};
