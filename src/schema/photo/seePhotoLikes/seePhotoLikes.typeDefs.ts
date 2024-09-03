export default `#graphql
    type Query {
        seePhotoLikes(id: Int!): [User]
    }
`;
