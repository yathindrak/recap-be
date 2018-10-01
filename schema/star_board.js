export default `

  type StarBoard {
    useridentity: String!,
    is_voted: Boolean,
    boardId: Int!
    }

   type StarBoardResponse {
    ok: Boolean!
    star_board: StarBoard
    errors: [Error!]
  }
  
  type Query {
    getStarBoards: [StarBoard]
    getStarBoard(boardId: Int!, useridentity: String!): StarBoard
    getStarredBoardsByUser(useridentity: String!): [StarBoard]
  }
  
  type Subscription {
    starBoardAdded: StarBoard
    starBoardDeleted: StarBoard
  }
  
  type Mutation {
    starBoard(boardId: Int!, useridentity: String!, is_voted: Boolean): StarBoardResponse!
    removeStarBoard(boardId: Int!, useridentity: String!): StarBoardResponse!
  }
`;
