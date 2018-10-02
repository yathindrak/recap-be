import _ from 'lodash';
import models from "../database/models";
import { pubsub } from "../server";

const BOARD_ADDED = 'BOARD_ADDED';
const BOARD_EDITED = 'BOARD_EDITED';
const BOARD_DELETED = 'BOARD_DELETED';

export default {
    Query: {
        getBoards: (parent, { id }, { models }) => models.Board.findAll(),
        getBoard: (parent, { id }, { models }) => models.Board.findOne({where: {id}}),
    },
    Board: {
        columns(board) {
            return models.Column.findAll({where:{board_id:board.id}})
        }
    },
    Column: {
        cards(column) {
            return models.Card.findAll({where:{column_id:column.id}})
        }
    },
    Subscription: {
        boardAdded: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([BOARD_ADDED]),
        },
        boardEdited: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([BOARD_EDITED]),
        },
        boardDeleted: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([BOARD_DELETED]),
        },
    },
    Mutation: {
        createBoard: async (parent, args, { models }) => {
            try {
                let board = await models.Board.create(args);
                pubsub.publish(BOARD_ADDED, { boardAdded: board });
                return {
                    ok: true,
                    board,
                };
            } catch (err) {
                console.log(err)
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                }
            }
        },

        updateBoard: async (parent, args, { models }) => {
            try {
                let board = await models.Board.update(
                    {
                        name: args.name,
                        description: args.description
                    },
                    {
                        where: {id: args.id}
                    }
                );

                pubsub.publish(BOARD_EDITED, { boardEdited: board });

                return {
                    ok: true,
                    board,
                };
            } catch (err) {
                console.log(err)
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                }
            }
        },
        deleteBoard: async (parent, args, { models }) => {

            try {
                let board = await models.Board.destroy(
                    {
                        where: {id: args.id}
                    }
                );

                pubsub.publish(BOARD_DELETED, { boardDeleted: board });

                return {
                    ok: true,
                    board,
                };

            } catch (err) {
                console.log(err);
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
