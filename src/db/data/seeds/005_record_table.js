/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('record').del()
  await knex('record').insert([
    {"r-user-id": 10001, "rr-id":1},
    {"r-user-id": 10002, "rr-id":1},
    {"r-user-id": 10003, "rr-id":1},
    {"r-user-id": 10004, "rr-id":1},
    {"r-user-id": 10002, "rr-id":2},
    {"r-user-id": 10003, "rr-id":2},
    {"r-user-id": 10004, "rr-id":2},
    {"r-user-id": 10001, "rr-id":2},
    {"r-user-id": 10001, "rr-id":3},
    {"r-user-id": 10001, "rr-id":4}
  ]);
};