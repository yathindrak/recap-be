import _ from 'lodash';
import {pubsub} from "../server";

const COLUMN_ADDED = 'COLUMN_ADDED';
const COLUMN_EDITED = 'COLUMN_EDITED';
const COLUMN_DELETED = 'COLUMN_DELETED';

export default {
    Query: {
        getColumns: (parent, { id }, { models }) => models.Column.findAll(),
        getColumn: (parent, { id }, { models }) => models.Column.findOne({where: {id}}),
    },
    Subscription: {
        columnAdded: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([COLUMN_ADDED]),
        },
        columnEdited: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([COLUMN_EDITED]),
        },
        columnDeleted: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([COLUMN_DELETED]),
        },
    },
    Mutation: {
        createColumn: async (parent, args, { models }) => {
            try {
                let column = await models.Column.create(args);

                pubsub.publish(COLUMN_ADDED, { columnAdded: column });

                return {
                    ok: true,
                    column,
                };
            } catch (err) {
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                }
            }
        },
        updateColumn: async (parent, args, { models }) => {
            try {
                let column = await models.Column.update(
                    {
                        name: args.name,
                        description: args.description
                    },
                    {
                        where: {id: args.id}
                    }
                );

                pubsub.publish(COLUMN_EDITED, { columnEdited: column });

                return {
                    ok: true,
                    column,
                };
            } catch (err) {
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                }
            }
        },
        deleteColumn: async (parent, args, { models }) => {

            try {
                let column = await models.Column.destroy(
                    {
                        where: {id: args.id}
                    }
                );

                pubsub.publish(COLUMN_DELETED, { columnDeleted: column });

                return {
                    ok: true,
                    column,
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
