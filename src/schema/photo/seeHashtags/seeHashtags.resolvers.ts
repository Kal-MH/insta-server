import client from "../../../client.js";

export default {
  Query: {
    seeHashtags: (_, { hashtag }) =>
      client.hashtag.findUnique({ where: { hashtag } }),
  },
};
