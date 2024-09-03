export default `#graphql
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    password: String!
    bio: String
    avatar: String
    followers: [User]
    following: [User]
    photos: [Photo]
    cratedAt: String!
    updatedAt: String!
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;
