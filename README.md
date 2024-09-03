# 기술 스택

### Tech

- graphql
- @apollo/server
- prisma
- express
- jwt(jsonwebtoken)
- babel

### Deploy

- heroku
- github actions

## 설치 및 사용 방법

1. 모든 패키지 모듈 설치

- Node v20.12.0
- PostgreSQL 15.7 (pgAdmin4 8.6)

```
npm install
```

2. Prisma DB 연결

- postgreSQL의 username과 연결할 DB의 이름을 `{}` 안에 기입
- 만약, 접근 권한 오류(P1001)이 발생한다면 `randompassword` 자리에 실제 DB 설치시 지정했던 password를 기입

```
// .env
DATABASE_URL="postgresql://{username}:randompassword@localhost:5432/{dbname}?schema=public"
```

2.1 추가 env파일 설정

```
// .env.example
DATABASE_URL="DB URL(In my case, postgreSQL)"
PORT=Server Port
SECRET_KEY=JWT Secret Key

AWS_ACCESS_ID=AWS S3 Access ID (for Photo upload)
AWS_ACCESS_SECRET_KEY=AWS S3 Access Secret Key
```

3. 실행

```
npm run dev
```

# DB

### 시나리오 및 기능

1. 사용자(User)는 사진(Photo)을 올리거나, 수정, 삭제가 가능합니다.
2. 사용자는 다른 사용자를 팔로우하거나 언팔로우할 수 있습니다.
3. 사용자는 사진 게시글에 댓글을 남기거나 수정, 삭제할 수 있습니다.
4. 사용자는 사진 게시글에 좋아요를 남기거나 좋아요를 취소할 수 있습니다.(단, 사용자는 한 게시글에 한 번만 좋아요를 남길 수 있습니다.)
5. 사용자는 다른 사용자에게 메세지를 남길 수 있습니다.

### ERD

- mermaid / Github gist

```mermaid
erDiagram
    USER {
        Int id PK
        String firstName
        String lastName
        String username
        String email
        String password
        String bio
        String avatar
        DateTime createdAt
        DateTime updatedAt
    }
    PHOTO {
        Int id PK
        Int userId FK
        String url
        String caption
        DateTime createdAt
        DateTime updatedAt
    }
    COMMENT {
        Int id PK
        Int userId FK
        Int photoId FK
        String payload
        DateTime createdAt
        DateTime updatedAt
    }
    LIKE {
        Int id PK
        Int userId FK
        Int photoId FK
        DateTime createdAt
        DateTime updatedAt
    }
    MESSAGE {
        Int id PK
        Int fromUserId FK
        Int toUserId FK
        String payload
        DateTime createdAt
        DateTime updatedAt
    }
    FOLLOW {
        Int id PK
        Int followerId FK
        Int followingId FK
        DateTime createdAt
        DateTime updatedAt
    }

    USER ||--o{ PHOTO : photos
    USER ||--o{ COMMENT : comments
    USER ||--o{ LIKE : likes
    USER ||--o{ MESSAGE : messagesSent
    USER ||--o{ MESSAGE : messagesReceived
    USER ||--o{ FOLLOW : followers
    USER ||--o{ FOLLOW : following
    PHOTO ||--o{ COMMENT : comments
    PHOTO ||--o{ LIKE : likes
```

# API

## User

```js
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
```

### Queries

#### me : User

- Arguments: None
- Return Type:
  - `User`
    - `id: ID!`
    - `username: String!`
    - `email: String!`
    - `firstName: String`
    - `lastName: String`
    - `bio: String`
    - `avatar: String`
    - `photos: [Photo]`
    - `followers: [User]`
    - `following: [User]`

#### searchUser(keyword: String!) : [User]

- Arguments:
  - `keyword: String!`
- Return Type:
  - `[User]`
    - `id: ID!`
    - `username: String!`
    - `email: String!`
    - `firstName: String`
    - `lastName: String`
    - `bio: String`
    - `avatar: String`

#### seeFollowers(username: String!, page: Int!) : SeeFollowersResult

- Arguments:
  - `username: String!`
  - `page: Int!`
- Return Type:
  - `SeeFollowersResult`
    - `ok: Boolean!`
    - `error: String`
    - `followers: [User]`
      - `id: ID!`
      - `username: String!`
      - `email: String!`
      - `firstName: String`
      - `lastName: String`
      - `bio: String`
      - `avatar: String`

#### seeFollowing(username: String!, page: Int!) : SeeFollowingResult

- Arguments:
  - `username: String!`
  - `page: Int!`
- Return Type:
  - `SeeFollowingResult`
    - `ok: Boolean!`
    - `error: String`
    - `following: [User]`
      - `id: ID!`
      - `username: String!`
      - `email: String!`
      - `firstName: String`
      - `lastName: String`
      - `bio: String`
      - `avatar: String`

#### seeProfile(username: String!) : User

- Arguments:
  - `username: String!`
- Return Type:
  - `User`
    - `id: ID!`
    - `username: String!`
    - `email: String!`
    - `firstName: String`
    - `lastName: String`
    - `bio: String`
    - `avatar: String`
    - `photos: [Photo]`
    - `followers: [User]`
    - `following: [User]`

### Mutations

#### createAccount(firstName: String!, lastName: String, username: String!, email: String!, password: String!) : CreateAccountResult

- Arguments:
  - `firstName: String!`
  - `lastName: String`
  - `username: String!`
  - `email: String!`
  - `password: String!`
- Return Type:
  - `CreateAccountResult`
    - `ok: Boolean!`
    - `error: String`

#### editProfile(firstName: String, lastName: String, username: String, email: String, password: String, bio: String, avatar: Upload) : EditProfileResult

- Arguments:
  - `firstName: String`
  - `lastName: String`
  - `username: String`
  - `email: String`
  - `password: String`
  - `bio: String`
  - `avatar: Upload`
- Return Type:
  - `EditProfileResult`
    - `ok: Boolean!`
    - `error: String`

#### login(email: String!, password: String!) : LoginResult

- Arguments:
  - `email: String!`
  - `password: String!`
- Return Type:
  - `LoginResult`
    - `ok: Boolean!`
    - `token: String`
    - `error: String`

#### unfollowUser(username: String!) : UnfollowUserResult

- Arguments:
  - `username: String!`
- Return Type:
  - `UnfollowUserResult`
    - `ok: Boolean!`
    - `error: String`

#### followUser(username: String!) : FollowUserResult

- Arguments:
  - `username: String!`
- Return Type:
  - `FollowUserResult`
    - `ok: Boolean!`
    - `error: String`

## Photo, HashTag, Like

### Type

```js
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
```

### Queries

#### searchPhoto(keyword: String!, lastId: Int, limit: Int) : [Photo]

- Arguments:
  - `keyword: String!`
- Return Type:
  - `[Photo]`
    - `id: Int!`
    - `user: User!`
    - `file: String!`
    - `caption: String`
    - `hashtags: [Hashtag]`
    - `likes: Int!`
    - `comments: Int!`
    - `createdAt: String!`
    - `updatedAt: String!`
    - `isMine: Boolean!`
    - `isLiked: Boolean!`

#### seeFeeds(page: Int!, lastId: Int, limit: Int) : [Photo]

- Arguments:
  - `page: Int!`
- Return Type:
  - `[Photo]`
    - `id: Int!`
    - `user: User!`
    - `file: String!`
    - `caption: String`
    - `hashtags: [Hashtag]`
    - `likes: Int!`
    - `comments: Int!`
    - `createdAt: String!`
    - `updatedAt: String!`
    - `isMine: Boolean!`
    - `isLiked: Boolean!`

#### seeHashtags(hashtag: String!) : Hashtag

- Arguments:
  - `hashtag: String!`
- Return Type:
  - `Hashtag`
    - `id: Int!`
    - `hashtag: String!`
    - `photos(page: Int!): [Photo]`
    - `totalPhotos: Int!`
    - `createdAt: String!`
    - `updatedAt: String!`

#### seePhoto(id: Int!) : Photo

- Arguments:
  - `id: Int!`
- Return Type:
  - `Photo`
    - `id: Int!`
    - `user: User!`
    - `file: String!`
    - `caption: String`
    - `hashtags: [Hashtag]`
    - `likes: Int!`
    - `comments: Int!`
    - `createdAt: String!`
    - `updatedAt: String!`
    - `isMine: Boolean!`
    - `isLiked: Boolean!`

#### seePhotoLikes(id: Int!) : [Like]

- Arguments:
  - `id: Int!`
- Return Type:
  - `[Like]`
    - `id: Int!`
    - `user: User!`
    - `photo: Photo!`
    - `createdAt: String!`
    - `updatedAt: String!`

### Mutations

#### uploadPhoto(file: Upload!, caption: String) : Photo

- Arguments:
  - `file: Upload!`
  - `caption: String`
- Return Type:
  - `Photo`
    - `id: Int!`
    - `user: User!`
    - `file: String!`
    - `caption: String`
    - `hashtags: [Hashtag]`
    - `likes: Int!`
    - `comments: Int!`
    - `createdAt: String!`
    - `updatedAt: String!`
    - `isMine: Boolean!`
    - `isLiked: Boolean!`

#### editPhoto(id: Int!, caption: String) : EditPhotoResult

- Arguments:
  - `id: Int!`
  - `caption: String`
- Return Type:
  - `EditPhotoResult`
    - `ok: Boolean!`
    - `error: String`

#### deletePhoto(id: Int!) : DeletePhotoResult

- Arguments:
  - `id: Int!`
- Return Type:
  - `DeletePhotoResult`
    - `ok: Boolean!`
    - `error: String`

#### toggleLike(id: Int!) : ToggleLikeResult

- Arguments:
  - `id: Int!`
- Return Type:
  - `ToggleLikeResult`
    - `ok: Boolean!`
    - `error: String`

## Comment

### Type

```js
    type Comment {
        id: Int!
        user: User!
        photo: Photo!
        payload: String!
        isMine: Boolean!
        createdAt: String!
        updatedAt: String!
    }
```

### Queries

#### seePhotoComments(photoId: Int!) : [Comment]

- Arguments:
  - `photoId: Int!`
- Return Type:
  - `[Comment]`
    - `id: Int!`
    - `user: User!`
    - `photo: Photo!`
    - `payload: String!`
    - `isMine: Boolean!`
    - `createdAt: String!`
    - `updatedAt: String!`

### Mutations

#### createComment(photoId: Int!, payload: String!) : CreateCommentResult

- Arguments:
  - `photoId: Int!`
  - `payload: String!`
- Return Type:
  - `CreateCommentResult`
    - `ok: Boolean!`
    - `error: String`

#### editComment(id: Int!, payload: String!) : EditCommentResult

- Arguments:
  - `id: Int!`
  - `payload: String!`
- Return Type:
  - `EditCommentResult`
    - `ok: Boolean!`
    - `error: String`

#### deleteComment(id: Int!) : DeleteCommentResult

- Arguments:
  - `id: Int!`
- Return Type:
  - `DeleteCommentResult`
    - `ok: Boolean!`
    - `error: String`

## Message (개발 진행 중)

### Type

```js
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
```

### Queries

#### seeRoom(id: Int!) : Room

- Arguments:
  - `id: Int!`
- Return Type:
  - `Room`
    - `id: Int!`
    - `users: [User]`
    - `messages: [Message]`
    - `unreadTotal: Int!`
    - `createdAt: String!`
    - `updatedAt: String!`

#### seeRooms : [Room]

- Arguments: None
- Return Type:
  - `[Room]`
    - `id: Int!`
    - `users: [User]`
    - `messages: [Message]`
    - `unreadTotal: Int!`
    - `createdAt: String!`
    - `updatedAt: String!`

### Mutations

#### readMessage(id: Int!) : ReadMessageResult

- Arguments:
  - `id: Int!`
- Return Type:
  - `ReadMessageResult`
    - `ok: Boolean!`
    - `error: String`

#### sendMessage(payload: String!, roomId: Int, userId: Int) : SendMessageResult

- Arguments:
  - `payload: String!`
  - `roomId: Int`
  - `userId: Int`
- Return Type:
  - `SendMessageResult`
    - `ok: Boolean!`
    - `error: String`
