const pino = require("pino");

const logger = pino(
    {
        level: "debug",
        prettyPrint: {
            levelFirst: false,
            colorize: true,
            translateTime: true
        }
    },
    pino.destination()
);

export { logger };
