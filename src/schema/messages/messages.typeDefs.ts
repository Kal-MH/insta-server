export default `#graphql
    type Message {
        id: Int!
        payload: String!
        user: User!
        room: Room!
        read: Boolean!
        createdAt: String!
        updatedAt: String!
    }

    type Room {
        id: Int!
        users: [User]
        messages: [Message]
        unreadTotal: Int!
        createdAt: String!
        updatedAt: String!
    }
`;
