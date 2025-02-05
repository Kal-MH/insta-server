import client from "../../../client.js";
import { protectResolver } from "../../user/user.utils.js";

export default {
  Mutation: {
    sendMessage: protectResolver(
      async (_, { payload, roomId, userId }, { loggedInUser }) => {
        let room = null;

        if (!userId && !roomId) {
          return {
            ok: false,
            error: "userId or roomId are required",
          };
        }

        if (roomId) {
          room = await client.room.findUnique({
            where: {
              id: roomId,
            },
            select: {
              id: true,
            },
          });
          if (!room) {
            return {
              ok: false,
              error: "Room not found.",
            };
          }
        }

        if (userId && !roomId) {
          const user = await client.user.findUnique({
            where: {
              id: userId,
            },
            select: {
              id: true,
            },
          });
          if (!user) {
            return {
              ok: false,
              error: "This user does not exist.",
            };
          }
          room = await client.room.create({
            data: {
              users: {
                connect: [
                  {
                    id: userId,
                  },
                  {
                    id: loggedInUser.id,
                  },
                ],
              },
            },
          });
        }

        await client.message.create({
          data: {
            payload,
            room: {
              connect: {
                id: room.id,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
