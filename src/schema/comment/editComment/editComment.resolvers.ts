import client from "../../../client.js";
import { protectResolver } from "../../user/user.utils.js";

export default {
  Mutation: {
    editComment: protectResolver(
      async (_, { id, payload }, { loggedInUser }) => {
        const comment = await client.comment.findUnique({
          where: { id },
          select: { userId: true },
        });

        if (!comment) {
          return {
            ok: false,
            error: "Comment not found",
          };
        }

        if (comment.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Not Authorized",
          };
        }

        await client.comment.update({
          where: {
            id,
          },
          data: {
            payload,
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
