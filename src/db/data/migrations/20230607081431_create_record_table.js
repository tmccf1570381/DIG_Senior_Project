/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("record", (table) => {
        table.increments("rec-id",32).primary();
        table.integer("r-user-id",32);
        table.integer("rr-id",32);

        table.foreign("r-user-id").references("user.user-id");
        table.foreign("rr-id").references("posted.id");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("record");  
};
