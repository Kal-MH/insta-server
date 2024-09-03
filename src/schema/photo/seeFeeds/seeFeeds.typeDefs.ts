export default `#graphql
    type SeeFeedsResult {
        ok: Boolean
        error: String
        photos: [Photo]
    }

    type Query {
        seeFeeds(lastId: Int, limit: Int): [Photo]
    }
`;
