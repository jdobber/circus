import { test } from "tap";
import Fastify from "fastify";
import PATH from "path";

test("fastify.convict should exist / TOML", async t => {
    t.plan(1);
    t.tearDown(() => fastify.close());

    const fastify = Fastify();

    // Register configuration plugin
    fastify.register(import(".."), {
        path: PATH.join(__dirname, "fixtures"),
        schema: "server.schema.json",
        format: "toml"
    });

    await fastify.ready();

    t.ok(fastify.convict);
});

test("fastify.convict should exist / JSON", async t => {
    t.plan(1);
    t.tearDown(() => fastify.close());

    const fastify = Fastify();

    // Register configuration plugin
    fastify.register(import(".."), {
        path: PATH.join(__dirname, "fixtures"),
        schema: "server.schema.json"
    });

    await fastify.ready();

    t.ok(fastify.convict);
});

test("fastify.convict fails", async t => {
    t.plan(1);
    t.tearDown(() => fastify.close());

    const fastify = Fastify();

    // Register configuration plugin with wrong path
    fastify.register(import(".."), {
        path: PATH.join(__dirname, "???"),
        schema: "server.schema.json",
        format: "toml"
    });

    t.rejects(fastify.ready());
});
