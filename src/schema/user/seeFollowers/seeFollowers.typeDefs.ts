export default `#graphql
    type SeeFollowersResult {
        ok: Boolean!
        error: String
        followers: [User]
        totalPages: Int
    }

    type Query {
        seeFollowers(username: String!, page: Int!): SeeFollowersResult
    }
`;
