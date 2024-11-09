// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection:
      "postgresql://food_surplus_managment_owner:vgldyJ85ZVsa@ep-spring-cell-a5ntaxmz.us-east-2.aws.neon.tech/food_surplus_managment?sslmode=require",
    pool: {
      min: 2,
      max: 10,
    },
    migrations: { directory: "./migrations" },
    seeds: { directory: "./seeds" },
  },
};
