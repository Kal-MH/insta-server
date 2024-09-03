import client from "../../../client.js";
const LIMIT = 5;
export default {
    Query: {
        seeFollowers: async (_, { username, page }) => {
            const ok = await client.user.findUnique({
                where: { username },
                select: { id: true },
            });
            if (!ok) {
                return {
                    ok: false,
                    error: "User not found",
                };
            }
            const followers = await client.user
                .findUnique({ where: { username } })
                .followers({
                take: LIMIT,
                skip: (page - 1) * LIMIT,
            });
            const totalPages = await client.user.count({
                where: {
                    following: { some: { username } },
                },
            });
            return {
                ok: true,
                followers,
                totalPages,
            };
        },
    },
};
