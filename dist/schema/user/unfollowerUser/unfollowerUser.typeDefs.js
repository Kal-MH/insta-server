export default `#graphql
    type UnfollowUserResult {
        ok: Boolean!
        error: String
    }

    type Mutation {
        unfollowUser(username: String!): UnfollowUserResult
    }
`;
