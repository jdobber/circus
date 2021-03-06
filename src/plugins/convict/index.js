import fp from "fastify-plugin";
import fs from "fs";
import PATH from "path";
import TOML from "@iarna/toml";

// load convict
import convict from "convict";
import convict_format_with_validator from "convict-format-with-validator";
convict.addFormats(convict_format_with_validator);
convict.addParser({ extension: "toml", parse: TOML.parse });

async function fastifyConvict(fastify, options, done) {
    try {
        let { path, schema, format = "json" } = options;

        // Define a schema

        let config = convict(
            JSON.parse(fs.readFileSync(PATH.join(path, schema), "utf-8"))
        );

        // Load environment dependent configuration
        let env = config.get("env");
        let config_file = PATH.join(path, `${env}.${format}`);

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
