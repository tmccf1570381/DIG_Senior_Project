/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('review').del()
  await knex('review').insert([
    {"r-id": 1, comment:"さいこーザマス"},
    {"r-id": 1, comment:"これ以上ないザマス"},
    {"r-id": 2, comment:"笑顔が一番！ざます。"},
    {"r-id": 1, comment:"菊地さんは真面目ザマス"},
    {"r-id": 3, comment:"ちょーさいこー"},
    {"r-id": 4, comment:"こーちょー"},
    {"r-id": 5, comment:"Digital innovation Garage"},
    {"r-id": 6, comment:"ザザザマス"},
    {"r-id": 7, comment:"良いザマス"},
    {"r-id": 2, comment:"ザ〜マス"},
  ]);
};
