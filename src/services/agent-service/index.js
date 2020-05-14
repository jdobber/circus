import fp from "fastify-plugin";

async function fastifyAgentService(fastify, options, done) {
    try {
        fastify.register(import("../../plugins/service-loader"), {
            name: "agent-service",
            path: __dirname
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
