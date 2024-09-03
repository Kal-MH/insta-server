import client from "../../../client.js";
import { protectResolver } from "../../user/user.utils.js";

export default {
  Query: {
    seeFeeds: protectResolver(
      async (_, { lastId, limit }, { loggedInUser }) => {
        const feeds = await client.photo.findMany({
          where: {
            OR: [
              {
                user: {
                  followers: {
                    some: {
                      id: loggedInUser.id,
                    },
                  },
                },
              },
              {
                userId: loggedInUser.id,
              },
            ],
          },
          take: limit ? limit : 3,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
          orderBy: {
            createdAt: "desc",
          },
        });

        return feeds;
      }
    ),
  },
};
