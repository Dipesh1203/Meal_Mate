/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("donation_meal", (table) => {
      table.increments("donation_meal_id").primary();
      table.integer("donor_id").notNullable();
      table.string("provider_name").notNullable();
      table.text("meal_description").notNullable();
      table.integer("quantity").notNullable().checkPositive(); // Adding a custom check
      table.text("pickup_location").notNullable();
      table.string("latitude");
      table.string("longitude");
      table.timestamp("expiry_date").notNullable();
      table.timestamp("pickup_time").defaultTo(knex.fn.now());
      table.boolean("is_claimed").defaultTo(false);
      table.boolean("is_reserved").defaultTo(false);
      table.integer("claimed_by");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .then(() =>
      knex.raw(`
    ALTER TABLE donation_meal
    ADD CONSTRAINT quantity_check CHECK (quantity > 0);
  `)
    );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("donation_meal");
};
