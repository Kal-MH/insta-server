import client from "../../client.js";

export default {
  Message: {
    user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
  },
  Room: {
    users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }) =>
      client.message.findMany({
        where: {
          roomId: id,
        },
      }),
    unreadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) return 0;

      return client.message.count({
        where: {
          roomId: id,
          read: false,
          user: {
            id: {
              not: loggedInUser.id,
            },
          },
        },
      });
    },
  },
};
