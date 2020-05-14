async function routes(fastify, options) {
    fastify.get("/health-check", async (request, reply) => {
        return { status: "ok" };
    });
}

export default routes;
