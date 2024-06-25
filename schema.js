import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "graphql-tools";

const loadedTypes = loadFilesSync(path.join(__dirname, "./**/*.typeDefs.js"));
const loadedResolvers = loadFilesSync(
  path.join(__dirname, "./**/*.{queries,mutations}.js")
);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);
const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
