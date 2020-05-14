import fp from "fastify-plugin";
import fs from "fs";

// load convict
import convict from "convict";
import convict_format_with_validator from "convict-format-with-validator";
convict.addFormats(convict_format_with_validator);

async function fastifyConvict(fastify, { schema }, done) {
    try {
        // Define a schema

        let config = await convict(
            await JSON.parse(fs.readFileSync(schema, "utf-8"))
        );

        // Load environment dependent configuration
        let env = config.get("env");
        let config_file = `./config/${env}.json`;

        fastify.log.info("Load configuration: ", config_file);
        config.loadFile(config_file);

        // Perform validation
        config.validate({ allowed: "strict" });

        // finish plugin
        fastify.decorate("convict", config);
        done();
    } catch (error) {
        done(new Error(error));
        return;
    }
}

export default fp(fastifyConvict, {
    fastify: ">=2.14.0",
    name: "fastify-convict"
});
