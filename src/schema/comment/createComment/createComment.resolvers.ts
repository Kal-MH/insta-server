import client from "../../../client.js";
import { protectResolver } from "../../user/user.utils.js";

export default {
  Mutation: {
    createComment: protectResolver(
      async (_, { photoId, payload }, { loggedInUser }) => {
        const ok = await client.photo.findUnique({
          where: {
            id: photoId,
          },
          select: {
            id: true,
          },
        });

        if (!ok) {
          return {
            ok: false,
            error: "Photo not Found.",
          };
        }

        const newComment = await client.comment.create({
          data: {
            payload,
            photo: {
              connect: {
                id: photoId,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });

        return {
          ok: true,
          id: newComment.id,
        };
      }
    ),
  },
};
