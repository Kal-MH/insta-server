import client from "../../../client.js";

export default {
  Query: {
    seePhotoLikes: async (_, { id }) => {
      const likes = await client.like.findMany({
        where: {
          photoId: id,
        },
        select: {
          user: true,
        },
      });

      return likes.map((like) => like.user);
    },
  },
};
