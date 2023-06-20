/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("skill", (table) => {
        table.increments("skill-id",32).primary();
        table.integer("user-id",32).notNullable();
        table.string("skill",128).notNullable();
        table.string("comment",256);
        table.string("date",16);

        table.foreign("user-id").references("user.user-id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("skill");  
};
