/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('skill').del()
  await knex('skill').insert([
    {"user-id": 10004, "skill-cd": 1,date:"2019-08-01"},
    {"user-id": 10004, "skill-cd": 11,date:"2022-11-04"},
    {"user-id": 10004, "skill-cd": 4,date:"2023-03-13"},
    {"user-id": 10023, "skill-cd": 2,date:"2022-04-06"},
    {"user-id": 10023, "skill-cd": 3,date:"2022-10-09"},
    {"user-id": 10023, "skill-cd": 11,date:"2020-07-04"},
    {"user-id": 10023, "skill-cd": 4,date:"2023-03-13"},
    {"user-id": 10024, "skill-cd": 1,date:"2022-11-13"},
    {"user-id": 10024, "skill-cd": 4,date:"2023-03-13"},
    {"user-id": 10025, "skill-cd": 1,date:"2022-02-05"},
    {"user-id": 10025, "skill-cd": 2,date:"2022-04-06"},
    {"user-id": 10025, "skill-cd": 3,date:"2022-10-09"},
    {"user-id": 10025, "skill-cd": 11,date:"2020-07-04"},
    {"user-id": 10025, "skill-cd": 4,date:"2022-10-31"},
    {"user-id": 10025, "skill-cd": 5,date:"2023-03-13"},
    {"user-id": 10025, "skill-cd": 8,date:"2022-07-13"},
  ]);
};
