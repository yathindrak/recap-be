export default `

  type User {
    useridentity: String!
  }

  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
  }

  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }
  
  type Mutation {
    login(useridentity: String!): LoginResponse!
  }
`;
