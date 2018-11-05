import _ from "lodash";
import {pubsub} from "../server";

const VOTE_CARD_ADDED = 'VOTE_CARD_ADDED';
const VOTE_CARD_DELETED = 'VOTE_CARD_DELETED';

export default {
    Query: {
        getVoteCards: (parent, { id }, { models }) => models.VoteCard.findAll(),
        getVoteCard: (parent, { cardId, useridentity }, { models }) => models.VoteCard.findOne(
            {
                where: {
                    cardId,
                    useridentity
                }
            }
        ),
        getVoteCardsByBoard: (parent, { boardId }, { models }) => models.VoteCard.findAll(
            {
                where: {
                    boardId
                }
            }
        ),
        getVoteCardsByUser: (parent, { useridentity, boardId }, { models }) => models.VoteCard.findAll(
            {
                where: {
                    useridentity,
                    boardId
                }
            }
        ),
    },
    Subscription: {
        voteCardAdded: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([VOTE_CARD_ADDED]),
        },
        voteCardDeleted: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([VOTE_CARD_DELETED]),
        },
    },
    Mutation: {
        starCard: async (parent, {is_voted, cardId , useridentity, boardId }, { models }) => {
            try {
                let vote_card = await models.VoteCard.create({
                    is_voted: is_voted, cardId:cardId , useridentity:useridentity, boardId:boardId
                });
                pubsub.publish(VOTE_CARD_ADDED, { voteCardAdded: vote_card });

                return {
                    ok: true,
                    vote_card,
                };
            } catch (err) {
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                }
            }
        },
        removeStarCard: async (parent, { cardId , useridentity, boardId }, { models }) => {
            try {
                let vote_card = await models.VoteCard.destroy({
                    where: {
                        cardId: cardId,
                        useridentity: useridentity
                    }
                });
                pubsub.publish(VOTE_CARD_DELETED, { voteCardDeleted: vote_card });

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
