export default `#graphql
    type Mutation {
        sendMessage(payload: String!, roomId: Int, userId: Int): MutationResponse
    }
`;
