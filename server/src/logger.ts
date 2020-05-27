const appRoot = require('app-root-path')
const winston = require('winston')

const options = {
    file: [
          {
            level: 'info',
            filename: `${appRoot}/logs/access.log`,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: true,
          },
          {
            level: 'error',
            filename: `${appRoot}/logs/error.log`,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: true,
          },
    ],
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  }

  let logger = winston.createLogger({
    transports: [
      new winston.transports.File(options.file[0]),
      new winston.transports.File(options.file[1]),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
  })

  logger.stream = {
    write: function(message: any, encoding: any) {
      logger.info(message);
    },
  }

  module.exports = logger