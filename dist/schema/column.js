"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n\n  type Column {\n    id: ID,\n    name: String,\n    description: String,\n    order_num: Int,\n    cards: [Card]\n    }\n\n   type ColumnResponse {\n    ok: Boolean!\n    column: Column\n    errors: [Error!]\n  }\n  \n  type Query {\n    getColumns: [Column]\n    getColumn(id: Int!): Column\n  }\n  \n  type Subscription {\n    columnAdded: Column\n    columnEdited: Column\n    columnDeleted: Column\n  }\n  \n  type Mutation {\n    createColumn(boardId: Int!, name: String!, description: String!, order_num: Int!): ColumnResponse!\n    updateColumn(id: Int!, name: String!, description: String!): ColumnResponse!\n    deleteColumn(id: Int!): ColumnResponse!\n  }\n";