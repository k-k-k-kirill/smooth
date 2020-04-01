// Update with your config settings.
require('dotenv').config()

module.exports = {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME,
      port: process.env.DB_PORT
    },
    migrations: {
      directory: './dist/database/migrations',
      extension: 'js'
    },
    seeds: {
      directory: './dist/database/seeds',
      extension: 'js'
    }
};
