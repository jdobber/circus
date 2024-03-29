import Fastify from "fastify";
import path from "path";

import { logger } from "./logger";

// Require the framework and instantiate it
const fastify = Fastify({
    logger: logger,
    disableRequestLogging: true
});

// Register 3rd-party plugins
fastify.register(import("fastify-blipp"));
fastify.register(import("fastify-url-data"));
fastify.register(import("fastify-cors"));

// Register own plugins

// Register configuration plugin
fastify.register(import("./plugins/convict"), {
    path: "./config",
    schema: "server.schema.json",
    format: "toml"
});

// Register services
fastify.register(import("./services/agent-service"));
fastify.register(import("./services/book-service"));

// Routes
fastify.register(import("./routes/health-check"));

// Start server
const start = async () => {
    try {
        await fastify.ready(); // wait for all plugins to be loaded
        await fastify.listen(fastify.convict.get("server.port"));
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }

    fastify.blipp();
};
start();
