export default `

  type Comment {
    useridentity: String!,
    message: String!,
    cardId: Int!
    }

   type CommentResponse {
    ok: Boolean!
    comment: Comment
    errors: [Error!]
  }
  
  type Query {
    getComments: [Comment]
    getComment(cardId: Int!, useridentity: String!): Comment
    getCommentsByUser(useridentity: String!, boardId: Int!): [Comment]
    getCommentsByBoard(boardId: Int!): [Comment]
  }
  
  type Subscription {
    commentAdded: Comment
  }
  
  type Mutation {
    addComment(message: String!, cardId: Int!, useridentity: String!, boardId:Int!): CommentResponse!
  }
`;
