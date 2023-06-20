/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("profiles", (table) => {
        table.integer("user-id",32).primary();
        table.string("16person",32);
        table.string("team",64);
        table.string("position",32);

        table.foreign("user-id").references("user.user-id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("profiles");  
};
