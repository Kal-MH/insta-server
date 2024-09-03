import client from "../../../client.js";
export default {
    Query: {
        searchUser: (_, { keyword }) => client.user.findMany({
            where: {
                username: {
                    startsWith: keyword,
                    mode: "insensitive",
                },
            },
        }),
    },
};
