import fp from "fastify-plugin";
import { loadTypes, loadResolvers } from "./utils";

const { ApolloServer } = require("apollo-server-fastify");

async function fastifyServiceLoader(fastify, { name, path }, done) {
    try {
        fastify.log.info(`Load service: ${name} from ${path}`);

        const apollo = new ApolloServer({
            typeDefs: loadTypes(path),
            resolvers: loadResolvers(path)
        });
        fastify.register(apollo.createHandler(name), {
            prefix: name
        });

        done();
    } catch (error) {
        done(new Error(error));
        return;
    }
}

export default fp(fastifyServiceLoader, {
    fastify: ">=2.14.0",
    name: "fastify-agent-service"
});
