const { gql } = require('apollo-server');

const typeDefs = gql`
    type Board {
        id: ID
        name: String,
        description: String,
        columns: [Column]
    }

    type Column {
        id: ID,
        name: String,
        description: String,
        order_num: Int,
        cards: [Card]
    }

    type Card {
        id: ID,
        name: String,
        description: String,
        order_num: Int
    }

    type Query {
        getBoards: [Board]
        getBoard: Board
    }
`;

module.exports = typeDefs;
