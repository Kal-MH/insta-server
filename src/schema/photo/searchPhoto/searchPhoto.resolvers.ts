import client from "../../../client.js";

export default {
  Query: {
    searchPhoto: (_, { keyword, lastId, limit }) => {
      return client.photo.findMany({
        where: {
          caption: {
            contains: keyword,
          },
        },
        take: limit ? limit : 6,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  },
};
