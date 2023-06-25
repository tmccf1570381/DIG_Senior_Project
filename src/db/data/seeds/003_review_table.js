/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('review').del()
  await knex('review').insert([
    {"id": 1, comment:"さいこーザマス"},
    {"id": 1, comment:"これ以上ないザマス"},
    {"id": 2, comment:"笑顔が一番！ざます。"},
    {"id": 1, comment:"菊地さんは真面目ザマス"},
    {"id": 3, comment:"ちょーさいこー"},
    {"id": 4, comment:"こーちょー"},
    {"id": 5, comment:"Digital innovation Garage"},
    {"id": 6, comment:"ザザザマス"},
    {"id": 7, comment:"良いザマス"},
    {"id": 2, comment:"ザ〜マス"},
  ]);
};
