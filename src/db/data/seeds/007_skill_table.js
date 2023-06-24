/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('skill').del()
  await knex('skill').insert([
    {"user-id": 10004, skill: 'ITパスポート',date:"2019-08-01"},
    {"user-id": 10004, skill: 'G検定',date:"2022-11-04"},
    {"user-id": 10004, skill: 'AWS クラウドプラクティショナー',date:"2023-03-13"},
    {"user-id": 10023, skill: '基本情報技術者',date:"2022-04-06"},
    {"user-id": 10023, skill: '応用情報技術者',date:"2022-10-09"},
    {"user-id": 10023, skill: 'G検定',date:"2020-07-04"},
    {"user-id": 10023, skill: 'AWS クラウドプラクティショナー',date:"2023-03-13"},
    {"user-id": 10024, skill: 'ITパスポート',date:"2022-11-13"},
    {"user-id": 10024, skill: 'AWS クラウドプラクティショナー',date:"2023-03-13"},
    {"user-id": 10025, skill: 'ITパスポート',date:"2022-02-05"},
    {"user-id": 10025, skill: '基本情報技術者',date:"2022-04-06"},
    {"user-id": 10025, skill: '応用情報技術者',date:"2022-10-09"},
    {"user-id": 10025, skill: 'G検定',date:"2020-07-04"},
    {"user-id": 10025, skill: 'AWS クラウドプラクティショナー',date:"2022-10-31"},
    {"user-id": 10025, skill: 'AWS ソリューションアーキテクト アソシエイト',date:"2023-03-13"},
  ]);
};
