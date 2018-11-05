"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n\n  type User {\n    useridentity: String!\n  }\n\n  type Query {\n    getUser(id: Int!): User!\n    allUsers: [User!]!\n  }\n\n  type LoginResponse {\n    ok: Boolean!\n    token: String\n    refreshToken: String\n    errors: [Error!]\n  }\n  \n  type Mutation {\n    login(useridentity: String!): LoginResponse!\n  }\n";