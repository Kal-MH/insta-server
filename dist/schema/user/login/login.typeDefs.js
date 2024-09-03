export default `#graphql
  type LoginResult {
    ok: Boolean!
    error: String
    token: String
  }

  type Mutation {
    login(username: String!, password: String!): LoginResult!
  }
`;
