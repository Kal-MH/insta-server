export default `#graphql
    type Query {
        seePhotoComments(id: Int!): [Comment]
    }
`;
