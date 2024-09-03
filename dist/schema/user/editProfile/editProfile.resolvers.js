import bcrypt from "bcrypt";
// import { createWriteStream } from "fs";
import client from "../../../client.js";
import { protectResolver } from "../user.utils.js";
import { uploadToS3 } from "../../shared/shared.utils.js";
export default {
    Mutation: {
        editProfile: protectResolver(async (_, { firstName, lastName, username, email, password: newPassword, bio, avatar, }, { loggedInUser }) => {
            let uglyPassword = null;
            if (newPassword) {
                uglyPassword = await bcrypt.hash(newPassword, 10);
            }
            let avatarUrl = null;
            if (avatar) {
                avatarUrl = await uploadToS3(avatar.file, loggedInUser.id, "avatars");
            }
            // if (avatar) {
            //   const { filename, createReadStream } = await avatar.file;
            //   const newFilename = `${Date.now()}-${filename}`;
            //   const readStream = createReadStream();
            //   const writeStream = createWriteStream(
            //     process.cwd() + "/uploads/" + newFilename
            //   );
            //   readStream.pipe(writeStream);
            //   avatarUrl = `http://localhost:4000/static/${newFilename}`;
            // }
            const updatedUser = await client.user.update({
                where: {
                    id: loggedInUser.id,
                },
                data: {
                    firstName,
                    lastName,
                    username,
                    email,
                    bio,
                    ...(uglyPassword && { password: uglyPassword }),
                    ...(avatarUrl && { avatar: avatarUrl }),
                },
            });
            if (updatedUser.id) {
                return {
                    ok: true,
                };
            }
            else {
                return {
                    ok: false,
                    error: "Could not update User",
                };
            }
        }),
    },
};
