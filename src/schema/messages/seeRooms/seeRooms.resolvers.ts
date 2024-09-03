import client from "../../../client.js";
import { protectResolver } from "../../user/user.utils.js";

export default {
  Query: {
    seeRooms: protectResolver(async (_, __, { loggedInUser }) => {
      return client.room.findMany({
        where: {
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
