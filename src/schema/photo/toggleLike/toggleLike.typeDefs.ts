export default `#graphql
    type ToggleLikeResult {
        ok: Boolean!
        error: String
    }

    type Mutation {
        toggleLike(id: Int!): ToggleLikeResult!
    }
`;
