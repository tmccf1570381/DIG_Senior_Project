/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('skilllist').del()
  await knex('skilllist').insert([
    {"skill-cd": 1, "skill":"ITパスポート",level:1},
    {"skill-cd": 2, "skill":"基本情報技術者",level:2},
    {"skill-cd": 3, "skill":"応用情報技術者",level:3},
    {"skill-cd": 4, "skill":"AWS クラウドプラクティショナー",level:1},
    {"skill-cd": 5, "skill":"AWS ソリューションアーキテクト アソシエイト",level:2},
    {"skill-cd": 6, "skill":"AWS ソリューションアーキテクト プロフェッショナル",level:4},
    {"skill-cd": 7, "skill":"統計検定３級",level:1},
    {"skill-cd": 8, "skill":"統計検定2級",level:2},
    {"skill-cd": 9, "skill":"統計検定準１級",level:3},
    {"skill-cd": 10, "skill":"統計検定1級",level:4},
    {"skill-cd": 11, "skill":"G検定",level:1},
    {"skill-cd": 12, "skill":"E資格",level:3},
    {"skill-cd": 13, "skill":"ITストラテジスト",level:4},
    {"skill-cd": 14, "skill":"システムアーキテクト",level:4},
    {"skill-cd": 15, "skill":"データベーススペシャリスト",level:4},
  ]);
};