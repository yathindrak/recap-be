"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n\n  type VoteCard {\n    useridentity: String!,\n    is_voted: Boolean,\n    boardId: Int!,\n    cardId: Int!\n    }\n\n   type VoteCardResponse {\n    ok: Boolean!\n    vote_card: VoteCard\n    errors: [Error!]\n  }\n  \n  type Query {\n    getVoteCards: [VoteCard]\n    getVoteCard(cardId: Int!, useridentity: String!): VoteCard\n    getVoteCardsByBoard(boardId: Int!): [VoteCard]\n    getVoteCardsByUser(useridentity: String!, boardId: Int!): [VoteCard]\n  }\n  \n  type Subscription {\n    voteCardAdded: VoteCard\n    voteCardDeleted: VoteCard\n  }\n  \n  type Mutation {\n    starCard(cardId: Int!, useridentity: String!, is_voted: Boolean, boardId:Int!): VoteCardResponse!\n    removeStarCard(cardId: Int!, useridentity: String!, boardId: Int!): VoteCardResponse!\n  }\n";