import { protectResolver } from "../../user/user.utils.js";
import client from "../../../client.js";
import { processHashtags } from "../photo.utils.js";
import { uploadToS3 } from "../../shared/shared.utils.js";

export default {
  Mutation: {
    uploadPhoto: protectResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = [];
        if (caption) {
          hashtagObj = processHashtags(caption);
        }

        const fileUrl = await uploadToS3(file.file, loggedInUser.id, "uploads");

        const photo = client.photo.create({
          data: {
            file: fileUrl,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });

        return {
          ok: true,
          photo,
        };
      }
    ),
  },
};
