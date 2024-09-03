import client from "../../../client.js";

export default {
  Query: {
    seeProfile: async (_, { username }) => {
      return client.user.findUnique({
        where: {
          username,
        },
      });
    },
  },
};
