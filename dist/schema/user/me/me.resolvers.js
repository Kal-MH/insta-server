import client from "../../../client.js";
import { protectResolver } from "../user.utils.js";
export default {
    Query: {
        me: protectResolver(async (_, __, { loggedInUser }) => {
            const me = client.user.findUnique({
                where: {
                    id: loggedInUser.id,
                },
            });
            return me;
        }),
    },
};
