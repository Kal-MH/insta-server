import client from "../../../client.js";
import { protectResolver } from "../../user/user.utils.js";
import { processHashtags } from "../photo.utils.js";

export default {
  Mutation: {
    editPhoto: protectResolver(async (_, { id, caption }, { loggedInUser }) => {
      const oldPhoto = await client.photo.findFirst({
        where: {
          id,
          userId: loggedInUser.id,
        },
        include: {
          hashtags: {
            select: {
              hashtag: true,
            },
          },
        },
      });

      if (!oldPhoto) {
        return {
          ok: false,
          error: "Photo not found.",
        };
      }

      await client.photo.update({
        where: {
          id,
        },
        data: {
          caption,
          hashtags: {
            disconnect: oldPhoto.hashtags,
            connectOrCreate: processHashtags(caption),
          },
        },
      });

      return {
        ok: true,
      };
    }),
  },
};
