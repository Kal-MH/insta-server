export default `#graphql
    type Query {
        searchUser(keyword: String!): [User]
    }
`;
