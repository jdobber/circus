import fp from "fastify-plugin";
import PATH from "path";
import ArangoDB from "arangojs";

function close(fastify, done) {
    fastify.arango.close && fastify.arango.close();
    done();
}

async function fastifyAgentService(fastify, options, done) {
    try {
        // Use service loader to init GraphQL

        fastify.register(import("fastify-service-loader"), {
            name: "agent-service",
            path: PATH.join(__dirname, "..")
        });

        // Connect to database

        fastify.log.info(
            `Connecting to database at ${options.config.get("arangodb.url")}`
        );
        let db = new ArangoDB.Database({
            url: options.config.get("arangodb.url")
        });

        // Create collections

        ["Persons", "Organizations"].forEach(async coll => {
            try {
                let collection = db.collection(coll);
                await collection.create();
            } catch (error) {
                fastify.log.debug(`Collection ${coll} already exists.`);
            }
        });

        fastify.decorate("agentService", { db: db });
        fastify.addHook("onClose", close);

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
