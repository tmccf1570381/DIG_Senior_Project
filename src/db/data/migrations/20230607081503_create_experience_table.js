/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("experience", (table) => {
        table.increments("exp-id").primary();
        table.integer("user-id",32).notNullable();
        table.string("experience",128).notNullable();

        table.foreign("user-id").references("users.user-id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("experience");  
};
