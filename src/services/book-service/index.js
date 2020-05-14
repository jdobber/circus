import fp from "fastify-plugin";

async function fastifyBookService(fastify, options, done) {
    try {
        fastify.register(import("../../plugins/service-loader"), {
            name: "book-service",
            path: __dirname
        });
        done();
    } catch (error) {
        done(new Error(error));
        return;
    }
}

export default fp(fastifyBookService, {
    fastify: ">=2.14.0",
    name: "fastify-book-service"
});
