import client from "../../client.js";

export default {
  User: {
    //전체 사용자 각각에서 사용자를 팔로우하는 사람 중에 내가 포함되어 있는 사람의 수
    // = 내가 팔로잉하고 있는 사람의 수
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: { id },
          },
        },
      }),
    //전체 사용자가 팔로우하는 사람 중에 내가 포함되어 있는 사람의 수
    // = 나를 팔로우하는 사람의 수
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: { id },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;

      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;

      //id인 사람에 대해 내가 팔로우하고 있나
      const exist = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: { id },
          },
        },
      });

      return Boolean(exist);
    },
    photos: ({ id }) => client.user.findUnique({ where: { id } }).photos(),
  },
};
