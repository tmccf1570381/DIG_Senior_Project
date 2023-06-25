/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("explain", (table) => {
        table.integer("user-id",32);
        table.string("experience",128).notNullable();
        table.string("period",256).notNullable();
        table.integer("confidence",2).notNullable();

        table.foreign("user-id").references("users.user-id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("explain");  
};
