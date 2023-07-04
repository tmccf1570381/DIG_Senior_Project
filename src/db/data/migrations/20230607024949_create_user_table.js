/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("users", (table) => {
        table.integer("user-id",32).primary();
        table.string("first-name",32).notNullable();
        table.string("last-name",32).notNullable();
        table.string("mail").notNullable();
        table.integer("16id",2);
        table.string("role",32);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("users");  
};
