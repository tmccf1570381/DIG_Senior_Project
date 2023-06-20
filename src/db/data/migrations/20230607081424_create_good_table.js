/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("good", (table) => {
        table.integer("g-id",32).primary();
        table.integer("zamas",16);

        table.foreign("g-id").references("posted.id");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("good");  
};
