export default `#graphql
    type Comment {
        id: Int!
        user: User!
        photo: Photo!
        payload: String!
        isMine: Boolean!
        createdAt: String!
        updatedAt: String!
    }
`;
