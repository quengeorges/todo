const winston = require("winston");

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  defaultMeta: { service: 'web' },
  transports: [
    new winston.transports.File({ filename: 'out.log' }),
    new winston.transports.Console({ format: winston.format.simple() }),
  ]
});

module.exports = logger;
