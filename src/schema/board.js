export default `

  type Board {
    id: ID
    name: String,
    description: String,
    columns: [Column]
  }

   type BoardResponse {
    ok: Boolean!
    board: Board
    errors: [Error!]
  }
  
  type Query {
    getBoards: [Board]
    getBoard(id: Int!): Board
  }
  
  type Subscription {
    boardAdded: Board
    boardEdited: Board
    boardDeleted: Board
  }

  type Mutation {
    createBoard(name: String!, description: String!): BoardResponse!
    updateBoard(id: Int!, name: String!, description: String!): BoardResponse!
    deleteBoard(id: Int!): BoardResponse!
  }
`;
