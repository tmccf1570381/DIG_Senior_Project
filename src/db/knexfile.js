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
    connection: {
      host: process.env.DB_HOST,
      database:process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      port:5432,
      password:process.env.DB_PASSWORD,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
};
