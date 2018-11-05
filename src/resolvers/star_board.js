import _ from "lodash";
import {pubsub} from "../server";

const STARBOARD_ADDED = 'STARBOARD_ADDED';
const STARBOARD_DELETED = 'STARBOARD_DELETED';

export default {
    Query: {
        getStarBoards: (parent, { id }, { models }) => models.StarBoard.findAll(),
        getStarBoard: (parent, { boardId, useridentity }, { models }) => models.StarBoard.findOne(
            {
                where: {
                    boardId,
                    useridentity
                }
            }
            ),
        getStarredBoardsByUser: (parent, { useridentity }, { models }) => models.StarBoard.findAll(
            {
                where: {
                    useridentity
                }
            }
            ),
    },
    Subscription: {
        starBoardAdded: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([STARBOARD_ADDED]),
        },
        starBoardDeleted: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([STARBOARD_DELETED]),
        },
    },
    Mutation: {
        starBoard: async (parent, {is_voted, boardId , useridentity }, { models }) => {
            try {
                let star_board = await models.StarBoard.create({
                    is_voted: is_voted, boardId:boardId , useridentity:useridentity
                });
                pubsub.publish(STARBOARD_ADDED, { starBoardAdded: star_board });

                return {
                    ok: true,
                    star_board,
                };
            } catch (err) {
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                }
            }
        },
        removeStarBoard: async (parent, { boardId , useridentity }, { models }) => {
            try {
                let star_board = await models.StarBoard.destroy({
                    where: {
                        boardId: boardId,
                        useridentity: useridentity
                    }
                });
                pubsub.publish(STARBOARD_DELETED, { starBoardDeleted: star_board });

                return {
                    ok: true
                };
            } catch (err) {
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                }
            }
        },
    },
};


const formatErrors = (e, models) => {
    if (e instanceof models.sequelize.ValidationError) {
        return e.errors.map(x => _.pick(x, ['path', 'message']));
    }
    return [{ path: 'name', message: 'something went wrong' }];
};
