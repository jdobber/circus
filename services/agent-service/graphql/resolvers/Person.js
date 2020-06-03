import { aql } from "arangojs";

module.exports = {
    Person: {
        id: obj => {
            return obj._id;
        }
    },
    Query: {
        persons: async (obj, args, ctx, info) => {
            let { agentService } = ctx.fastify;

            const cursor = await agentService.db.query(
                aql`FOR p IN Persons RETURN p`
            );

            return cursor.all();
        }
    },
    Mutation: {
        addPerson: async (obj, { input }, ctx, info) => {
            let { agentService } = ctx.fastify;

            let collection = agentService.db.collection("Persons");
            let opts = { returnNew: true };
            let doc = await collection.save(input.person, opts);

            return {
                person: doc.new
            };
        }
    }
};
