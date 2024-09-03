export default `#graphql
    type DeleteCommentResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        deleteComment(id: Int!): DeleteCommentResult!
    }
`;
