/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('explain').del()
  await knex('explain').insert([
    {"user-id": 10004, experience: 'JavaScript', period: "6month", confidence: 4},
    {"user-id": 10004, experience: 'react', period: "3month", confidence: 4},
    {"user-id": 10004, experience: 'TypeScript', period: "3month", confidence: 4},
    {"user-id": 10004, experience: 'AWS', period: "3month", confidence: 4},
    {"user-id": 10004, experience: 'Python', period: "1year", confidence: 4},
    {"user-id": 10023, experience: 'JavaScript', period: "3year", confidence: 5},
    {"user-id": 10023, experience: 'TypeScript', period: "3year", confidence: 5},
    {"user-id": 10023, experience: 'Python', period: "10year", confidence: 5},
    {"user-id": 10023, experience: 'react', period: "3year", confidence: 5},
    {"user-id": 10023, experience: 'AWS', period: "3year", confidence: 4},
    {"user-id": 10024, experience: 'JavaScript', period: "6month", confidence: 4},
    {"user-id": 10024, experience: 'AWS', period: "3month", confidence: 2},
    {"user-id": 10025, experience: 'JavaScript', period: "3month", confidence: 2},
    {"user-id": 10025, experience: 'react', period: "3month", confidence: 2},
    {"user-id": 10025, experience: 'TypeScript', period: "3month", confidence: 2},
    {"user-id": 10025, experience: 'AWS', period: "3month", confidence: 2},
    {"user-id": 10025, experience: 'Python', period: "3month", confidence: 2},
  ]);
};
