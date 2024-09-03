import jwt from "jsonwebtoken";
import client from "../../client.js";
export const getUser = async (token) => {
    try {
        if (!token) {
            return null;
        }
        const { id } = await jwt.verify(token, process.env.SECRET_KEY);
        const user = await client.user.findUnique({ where: { id } });
        if (user)
            return user;
        return null;
    }
    catch (e) {
        console.log("here", e);
        return null;
    }
};
export const protectResolver = (ourResolvers) => (root, args, context, info) => {
    if (!context.loggedInUser) {
        const returnObj = info.operation.operation === "mutation"
            ? {
                ok: false,
                error: "Please log in to perform this action.",
            }
            : null;
        return returnObj;
    }
    return ourResolvers(root, args, context, info);
};
