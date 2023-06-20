/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "sp",
      user: "user",
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
  production: {
    client: "pg",
    // connection: {
    //   host: process.env.DB_HOST,
    //   database:process.env.DB_DATABASE,
    //   user: process.env.DB_USERNAME,
    //   port:5432,
    //   password:process.env.DB_PASSWORD,
    // },
    connection: process.env.DB_HOST,
    acquireConnectionTimeout: 1000000,
    pool: {
    min: 0,
    max: 1,
    acquireTimeoutMillis: 300000,
    createTimeoutMillis: 300000,
    destroyTimeoutMillis: 300000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis:1000,
    createRetryIntervalMillis: 2000
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
};
