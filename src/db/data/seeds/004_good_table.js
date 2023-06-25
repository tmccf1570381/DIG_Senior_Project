/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('good').del()
  await knex('good').insert([
    {"id": 1, "user-id": 10001},
    {"id": 2, "user-id": 10001},
    {"id": 5, "user-id": 10001},
    {"id": 8, "user-id": 10001},
    {"id": 9, "user-id": 10001},
    {"id": 10, "user-id": 10001},
    {"id": 1, "user-id": 10023},
    {"id": 2, "user-id": 10023},
    {"id": 4, "user-id": 10023},
    {"id": 6, "user-id": 10023},
    {"id": 8, "user-id": 10023},
    {"id": 1, "user-id": 10004},
    {"id": 4, "user-id": 10004},
    {"id": 6, "user-id": 10004},
    {"id": 7, "user-id": 10004},
  ]);
};
