export default `

  type Column {
    id: ID,
    name: String,
    description: String,
    order_num: Int,
    cards: [Card]
    }

   type ColumnResponse {
    ok: Boolean!
    column: Column
    errors: [Error!]
  }
  
  type Query {
    getColumns: [Column]
    getColumn(id: Int!): Column
  }
  
  type Subscription {
    columnAdded: Column
    columnEdited: Column
    columnDeleted: Column
  }
  
  type Mutation {
    createColumn(boardId: Int!, name: String!, description: String!, order_num: Int!): ColumnResponse!
    updateColumn(id: Int!, name: String!, description: String!): ColumnResponse!
    deleteColumn(id: Int!): ColumnResponse!
  }
`;
