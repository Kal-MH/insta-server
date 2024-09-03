import client from "../../../client.js";
import { protectResolver } from "../../user/user.utils.js";

export default {
  Query: {
    seeRoom: protectResolver(async (_, { id }, { loggedInUser }) => {
      return client.room.findFirst({
        where: {
          id,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      });
    }),
  },
};
