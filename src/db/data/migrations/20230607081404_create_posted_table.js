/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("posted", (table) => {
        table.increments("id").primary();
        table.string("title",128).notNullable();
        table.string("post-date",16).notNullable();
        table.string("tag",32).notNullable();
        table.string("url").notNullable();
        table.integer("user-id",32).notNullable();

        table.foreign("user-id").references("users.user-id");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("posted");  
};
