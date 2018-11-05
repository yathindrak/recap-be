"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n\n  type Board {\n    id: ID\n    name: String,\n    description: String,\n    columns: [Column]\n  }\n\n   type BoardResponse {\n    ok: Boolean!\n    board: Board\n    errors: [Error!]\n  }\n  \n  type Query {\n    getBoards: [Board]\n    getBoard(id: Int!): Board\n  }\n  \n  type Subscription {\n    boardAdded: Board\n    boardEdited: Board\n    boardDeleted: Board\n  }\n\n  type Mutation {\n    createBoard(name: String!, description: String!): BoardResponse!\n    updateBoard(id: Int!, name: String!, description: String!): BoardResponse!\n    deleteBoard(id: Int!): BoardResponse!\n  }\n";