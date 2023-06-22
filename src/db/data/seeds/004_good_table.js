/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('good').del()
  await knex('good').insert([
    {"g-id": 1, zamas: 1},
    {"g-id": 2, zamas: 100},
    {"g-id": 3, zamas: 4},
    {"g-id": 4, zamas: 3},
    {"g-id": 5, zamas: 92},
    {"g-id": 6, zamas: 1},
    {"g-id": 7, zamas: 12},
    {"g-id": 8, zamas: 11},
    {"g-id": 9, zamas: 0},
    {"g-id": 10, zamas: 0},
  ]);
};
