/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable();
    table.string("phone").notNullable();
    table.string("entity_name").notNullable().unique();
    table.text("address").notNullable();
    table.text("latitude");
    table.text("longitude");
    table.text("legal_identity");
    table.enum("entity", ["NGO", "PROVIDER"]);
    table.string("password");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
