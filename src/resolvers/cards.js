import _ from "lodash";
import {pubsub} from "../server";
import sequelize from '../database/connection';

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
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                }
            }
        },

        rearrangeCard: async (parent, args, { models }) => {

            const indexToAdd = args.order_num;



            try {
                // get card by cardId
                let card = await models.Card.findOne({where: args.id});

                // get all cards in prev col by card.columnId and sorted by orderId
                let prevColCards = await models.Card.findAll({
                    where: {column_id: card.columnId},
                    order: [
                        ['order_num', 'ASC'],
                    ]
                });

                // put all cards into an array
                if (typeof prevColCards !== 'object') {
                    prevColCards = JSON.parse(prevColCards);
                }

                // console.log(JSON.stringify(prevColCards));
                // console.log("------------------------------")
                // Remove the card we are rearranging
                const indexToRemove = prevColCards.findIndex(item => item.order_num === card.order_num);
                let removedCard = prevColCards.splice(indexToRemove, 1);

                prevColCards.map((card,index) => {
                    card.order_num = index;
                });

                // Add removed card into the new or existing column

                // Add removed card into a new column
                if (card.columnId !== args.columnId)  {
                    // Get the cards of new col
                    let newColumnCards = await models.Card.findAll({
                        where: {column_id: args.columnId},
                        order: [
                            ['order_num', 'ASC'],
                        ]
                    });

                    // add removed card
                    newColumnCards.splice(indexToAdd, 0, ...removedCard);

                    newColumnCards.map((card,index) => {
                        card.order_num = index;
                    });

                    let tempArr = [];
                    newColumnCards.map(card=> {
                        tempArr.push({
                            order_num: card.order_num,
                            columnId: card.columnId
                        })
                    });
                    console.log(JSON.stringify(tempArr))
                    // await models.Card.bulkCreate(newColumnCards,
                    //     {
                    //         fields:["order_num", "columnId"] ,
                    //         updateOnDuplicate: ["order_num", "columnId"]
                    //     } );

                    // await sequelize.query('CALL sp_reorder_cards(:params )',
                    //     { replacements: {params : ['value1, value2, value3, value4']} })


                    await sequelize.query('call sp_reorder_cards(:CardDetails )',
                        { replacements: {CardDetails : tempArr} }
                        );


                } else {
                    prevColCards.splice(indexToAdd, 0, ...removedCard);

                    prevColCards.map((card,index) => {
                        card.order_num = index;
                    });

                    // console.log(JSON.stringify(prevColCards));
                }

                return {
                    ok: true,
                    card,
                };

            } catch (err) {
                console.log(err)
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
