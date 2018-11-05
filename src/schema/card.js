export default `

  type Card {
    id: ID,
    name: String,
    description: String,
    order_num: Int
  }

   type CardResponse {
    ok: Boolean!
    card: Card
    errors: [Error!]
  }
  
  type Query {
    getCards: [Card]
    getCard(id: Int!): Card
  }
  
  type Subscription {
    cardAdded: Card
    cardEdited: Card
    cardDeleted: Card
  }
  
  type Mutation {
    createCard(columnId: Int!, name: String!, description: String!, order_num: Int!): CardResponse!
    updateCard(id: Int!, name: String!, description: String!): CardResponse!
    deleteCard(id: Int!): CardResponse!
    rearrangeCard(id: Int!, columnId: Int!, order_num: Int!): CardResponse!
  }
`;
