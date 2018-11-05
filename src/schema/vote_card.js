export default `

  type VoteCard {
    useridentity: String!,
    is_voted: Boolean,
    boardId: Int!,
    cardId: Int!
    }

   type VoteCardResponse {
    ok: Boolean!
    vote_card: VoteCard
    errors: [Error!]
  }
  
  type Query {
    getVoteCards: [VoteCard]
    getVoteCard(cardId: Int!, useridentity: String!): VoteCard
    getVoteCardsByBoard(boardId: Int!): [VoteCard]
    getVoteCardsByUser(useridentity: String!, boardId: Int!): [VoteCard]
  }
  
  type Subscription {
    voteCardAdded: VoteCard
    voteCardDeleted: VoteCard
  }
  
  type Mutation {
    starCard(cardId: Int!, useridentity: String!, is_voted: Boolean, boardId:Int!): VoteCardResponse!
    removeStarCard(cardId: Int!, useridentity: String!, boardId: Int!): VoteCardResponse!
  }
`;
