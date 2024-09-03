export default `#graphql
    type FollowUserResult {
        ok: Boolean!
        error: String
    }

    type Mutation {
        followUser(username: String!) : FollowUserResult
    }
`;
