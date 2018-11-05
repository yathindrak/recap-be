'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    type Board {\n        id: ID\n        name: String,\n        description: String,\n        columns: [Column]\n    }\n\n    type Column {\n        id: ID,\n        name: String,\n        description: String,\n        order_num: Int,\n        cards: [Card]\n    }\n\n    type Card {\n        id: ID,\n        name: String,\n        description: String,\n        order_num: Int\n    }\n\n    type Query {\n        getBoards: [Board]\n        getBoard: Board\n    }\n'], ['\n    type Board {\n        id: ID\n        name: String,\n        description: String,\n        columns: [Column]\n    }\n\n    type Column {\n        id: ID,\n        name: String,\n        description: String,\n        order_num: Int,\n        cards: [Card]\n    }\n\n    type Card {\n        id: ID,\n        name: String,\n        description: String,\n        order_num: Int\n    }\n\n    type Query {\n        getBoards: [Board]\n        getBoard: Board\n    }\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require('apollo-server'),
    gql = _require.gql;

var typeDefs = gql(_templateObject);

module.exports = typeDefs;