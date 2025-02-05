import { protectResolver } from "../user.utils.js";
import client from "../../../client.js";

export default {
  Mutation: {
    unfollowUser: protectResolver(async (_, { username }, { loggedInUser }) => {
      const ok = await client.user.findUnique({ where: { username } });

      if (!ok) {
        return {
          ok: false,
          error: "Can't unfollow user",
        };
      }

      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          following: {
            disconnect: {
              username,
            },
          },
        },
      });

      return {
        ok: true,
      };
    }),
  },
};
