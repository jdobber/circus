import fp from "fastify-plugin";
const PATH = require("path");

async function fastifyAgentService(fastify, options, done) {
    try {
        fastify.register(import("fastify-service-loader"), {
            name: "agent-service",
            path: PATH.join(__dirname, "..")
        });
        done();
    } catch (error) {
        done(new Error(error));
        return;
    }
}

export default fp(fastifyAgentService, {
    fastify: ">=2.14.0",
    name: "fastify-agent-service"
});
