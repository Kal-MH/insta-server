import client from "../../../client.js";
import { protectResolver } from "../../user/user.utils.js";

export default {
  Mutation: {
    readMessage: protectResolver(async (_, { id }, { loggedInUser }) => {
      const message = await client.message.findFirst({
        where: {
          id,
          room: {
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
          userId: {
            not: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });

      if (!message) {
        return {
          ok: false,
          error: "Message not found",
        };
      }

      await client.message.update({
        where: {
          id,
        },
        data: {
          read: true,
        },
      });

      return {
        ok: true,
      };
    }),
  },
};
