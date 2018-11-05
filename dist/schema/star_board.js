"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n\n  type StarBoard {\n    useridentity: String!,\n    is_voted: Boolean,\n    boardId: Int!\n    }\n\n   type StarBoardResponse {\n    ok: Boolean!\n    star_board: StarBoard\n    errors: [Error!]\n  }\n  \n  type Query {\n    getStarBoards: [StarBoard]\n    getStarBoard(boardId: Int!, useridentity: String!): StarBoard\n    getStarredBoardsByUser(useridentity: String!): [StarBoard]\n  }\n  \n  type Subscription {\n    starBoardAdded: StarBoard\n    starBoardDeleted: StarBoard\n  }\n  \n  type Mutation {\n    starBoard(boardId: Int!, useridentity: String!, is_voted: Boolean): StarBoardResponse!\n    removeStarBoard(boardId: Int!, useridentity: String!): StarBoardResponse!\n  }\n";