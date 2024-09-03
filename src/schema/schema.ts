import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFiles, loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import url, { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const loadedTypes = await loadFiles(`${__dirname}/**/*.typeDefs.ts`, {
  requireMethod: async (path: string) => {
    return await import(url.pathToFileURL(path).toString());
  },
});
const loadedResolvers = await loadFiles(`${__dirname}/**/*.resolvers.ts`, {
  requireMethod: async (path: string) => {
    return await import(url.pathToFileURL(path).toString());
  },
});

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
