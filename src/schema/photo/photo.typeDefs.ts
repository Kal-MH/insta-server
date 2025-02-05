export default `#graphql
    type Photo {
        id: Int!
        user: User!
        file: String!
        caption: String
        likes: Int!
        commentNumber: Int!
        comments: [Comment]
        hashtags: [Hashtag]
        createdAt: String!
        updatedAt: String!
        isMine: Boolean!
        isLiked: Boolean!
    }

    type Hashtag {
        id: Int!
        hashtag: String!
        photos(page: Int!): [Photo]
        totalPhotos: Int!
        createdAt: String!
        updatedAt: String!
    }

    type Like {
        id: Int!
        user: User!
        photo: Photo!
        createdAt: String!
        updatedAt: String!
    }
`;
