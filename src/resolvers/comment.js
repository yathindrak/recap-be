import _ from "lodash";
import {pubsub} from "../server";

const COMMENT_ADDED = 'COMMENT_ADDED';

export default {
    Query: {
        getComments: (parent, { id }, { models }) => models.Comment.findAll(),
        getComment: (parent, { cardId, useridentity }, { models }) => models.Comment.findOne(
            {
                where: {
                    cardId,
                    useridentity
                },
            }
        ),
        getCommentsByUser: (parent, { useridentity, boardId }, { models }) => models.Comment.findAll(
            {
                where: {
                    useridentity,
                    boardId
                }
            }
        ),
        getCommentsByBoard: (parent, { boardId }, { models }) => models.Comment.findAll(
            {
                where: {
                    boardId
                },
                order: [
                    ['createdAt', 'ASC']
                ],
            }
        ),
    },
    Subscription: {
        commentAdded: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator([COMMENT_ADDED]),
        },
    },
    Mutation: {
        addComment: async (parent, {message, cardId , useridentity, boardId }, { models }) => {
            try {
                let comment = await models.Comment.create({
                    useridentity:useridentity, message: message, cardId:cardId , boardId:boardId
                });

                pubsub.publish(COMMENT_ADDED, { commentAdded: comment });

                return {
                    ok: true,
                    comment,
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
