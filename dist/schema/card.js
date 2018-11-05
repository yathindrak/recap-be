"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n\n  type Card {\n    id: ID,\n    name: String,\n    description: String,\n    order_num: Int\n  }\n\n   type CardResponse {\n    ok: Boolean!\n    card: Card\n    errors: [Error!]\n  }\n  \n  type Query {\n    getCards: [Card]\n    getCard(id: Int!): Card\n  }\n  \n  type Subscription {\n    cardAdded: Card\n    cardEdited: Card\n    cardDeleted: Card\n  }\n  \n  type Mutation {\n    createCard(columnId: Int!, name: String!, description: String!, order_num: Int!): CardResponse!\n    updateCard(id: Int!, name: String!, description: String!): CardResponse!\n    deleteCard(id: Int!): CardResponse!\n    rearrangeCard(id: Int!, columnId: Int!, order_num: Int!): CardResponse!\n  }\n";