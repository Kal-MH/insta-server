export default `#graphql
    type EditPhotoResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        editPhoto(id: Int!, caption: String!): EditPhotoResult!
    }
`;
