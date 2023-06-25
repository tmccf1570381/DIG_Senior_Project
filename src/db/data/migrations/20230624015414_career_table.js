/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("career", (table) => {
        table.increments("car-id",32).primary();
        table.integer("user-id",32).notNullable();
        table.string("career",128).notNullable();
        table.string("date-c",16);

        table.foreign("user-id").references("users.user-id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("career");  
};
