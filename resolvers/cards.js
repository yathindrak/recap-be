import _ from "lodash";
import {pubsub} from "../server";

const CARD_ADDED = 'CARD_ADDED';
const CARD_EDITED = 'CARD_EDITED';
const CARD_DELETED = 'CARD_DELETED';

export default {
    Query: {
        getCards: (parent, { id }, { models }) => models.Card.findAll(),
        getCard: (parent, { id }, { models }) => models.Card.findOne({where: {id}}),
    },
    Subscription: {
        cardAdded: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([CARD_ADDED]),
        },
        cardEdited: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([CARD_EDITED]),
        },
        cardDeleted: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([CARD_DELETED]),
        },
    },
    Mutation: {
        createCard: async (parent, args, { models }) => {
            try {
                let card = await models.Card.create(args);
                pubsub.publish(CARD_ADDED, { cardAdded: card });
                return {
                    ok: true,
                    card,
                };
            } catch (err) {
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                }
            }
        },
        updateCard: async (parent, args, { models }) => {
            try {
                let card = await models.Card.update(
                    {
                        name: args.name,
                        description: args.description
                    },
                    {
                        where: {id: args.id}
                    }
                );

                pubsub.publish(CARD_EDITED, { cardEdited: card });

                return {
                    ok: true,
                    card,
                };
            } catch (err) {
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                }
            }
        },
        deleteCard: async (parent, args, { models }) => {

            try {
                let card = await models.Card.destroy(
                    {
                        where: {id: args.id}
                    }
                );

                pubsub.publish(CARD_DELETED, { cardDeleted: card });

                return {
                    ok: true,
                    card,
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
