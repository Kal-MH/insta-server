import client from "../../../client.js";

export default {
  Query: {
    seePhoto: (_, { id }) =>
      client.photo.findUnique({
        where: { id },
      }),
  },
};
