"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n\n  type Comment {\n    useridentity: String!,\n    message: String!,\n    cardId: Int!\n    }\n\n   type CommentResponse {\n    ok: Boolean!\n    comment: Comment\n    errors: [Error!]\n  }\n  \n  type Query {\n    getComments: [Comment]\n    getComment(cardId: Int!, useridentity: String!): Comment\n    getCommentsByUser(useridentity: String!, boardId: Int!): [Comment]\n    getCommentsByBoard(boardId: Int!): [Comment]\n  }\n  \n  type Subscription {\n    commentAdded: Comment\n  }\n  \n  type Mutation {\n    addComment(message: String!, cardId: Int!, useridentity: String!, boardId:Int!): CommentResponse!\n  }\n";