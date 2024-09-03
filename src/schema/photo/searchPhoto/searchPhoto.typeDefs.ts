export default `#graphql
    type Query {
        searchPhoto(keyword: String!, lastId: Int, limit: Int): [Photo]
    }
`;
