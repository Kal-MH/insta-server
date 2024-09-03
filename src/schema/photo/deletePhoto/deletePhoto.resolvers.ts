import client from "../../../client.js";
import { protectResolver } from "../../user/user.utils.js";

export default {
  Mutation: {
    deletePhoto: protectResolver(async (_, { id }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({
        where: { id },
        select: { userId: true },
      });

      if (!photo) {
        return {
          ok: false,
          error: "Photo not found",
        };
      }

      if (photo.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not authorized",
        };
      }

      await client.photo.delete({
        where: { id },
      });

      return {
        ok: true,
      };
    }),
  },
};
