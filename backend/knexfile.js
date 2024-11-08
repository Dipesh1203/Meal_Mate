// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection:
      "postgresql://neondb_owner:N3YcitP5xrQX@ep-raspy-breeze-a5kvvdt3.us-east-2.aws.neon.tech/neondb?sslmode=require",
    pool: {
      min: 2,
      max: 10,
    },
    migrations: { directory: "./migrations" },
    seeds: { directory: "./seeds" },
  },
};
