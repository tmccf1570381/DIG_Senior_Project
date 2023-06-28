/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('review').del()
  await knex('review').insert([
    {"id": 1, comment:"デジタル予算の申請に悩んだらこちら"},
    {"id": 2, comment:"道路運送車両法"},
    {"id": 3, comment:"CXM調査実施要領"},
    {"id": 4, comment:"CXM-B 調査データ"},
    {"id": 5, comment:"CXM-C 調査データ"},
    {"id": 6, comment:"CXM メタデータ"},
    {"id": 7, comment:"全社ライブイベントの資料"},
    {"id": 8, comment:"販売店への通知書簡 by 国内営業"},
    {"id": 9, comment:"一般経費フォーマット"},
    {"id": 10, comment:"ゆうぞうさん！頑張ってください！"},
    {"id": 11, comment:"TBP研修の参考に"},
    {"id": 12, comment:"デジタルに関する基礎知識を身につけたい方におすすめ！"},
  ]);
};
