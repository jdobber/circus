const path = require("path");
const mergeGraphqlSchemas = require("merge-graphql-schemas");
const fileLoader = mergeGraphqlSchemas.fileLoader;

export function loadTypes(prefix, dirnames = ["**"]) {
    let types = [];
    dirnames.forEach(dirname => {
        let p = path.join(prefix, `graphql/${dirname}/*.gql`);
        types.push(fileLoader(p));
    });
    return types.flat();
}

export function loadResolvers(prefix, dirnames = ["**"]) {
    let resolvers = [];
    dirnames.forEach(dirname => {
        let p = path.join(prefix, `graphql/${dirname}/*.js`);
        resolvers.push(fileLoader(p));
    });
    return resolvers.flat();
}
