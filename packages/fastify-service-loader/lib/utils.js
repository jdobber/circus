const path = require("path");
import { loadFilesSync } from "@graphql-tools/load-files";
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");

export function loadTypes(prefix, dirnames = ["**"]) {
    let types = [];
    dirnames.forEach(dirname => {
        let p = path.join(prefix, `graphql/${dirname}/*.gql`);
        types.push(loadFilesSync(p));
    });
    return mergeTypeDefs(types.flat(), { all: true });
}

export function loadResolvers(prefix, dirnames = ["**"]) {
    let resolvers = [];
    dirnames.forEach(dirname => {
        let p = path.join(prefix, `graphql/${dirname}/*.js`);
        resolvers.push(loadFilesSync(p));
    });
    return mergeResolvers(resolvers.flat());
}
