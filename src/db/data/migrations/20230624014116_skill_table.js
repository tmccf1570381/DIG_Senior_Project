/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("skill", (table) => {
        table.integer("user-id",32).notNullable();
        table.integer("skill-cd",128).notNullable();
        table.string("date",16);

        table.foreign("user-id").references("users.user-id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("skill");  
};
