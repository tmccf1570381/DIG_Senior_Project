/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('16person').del()
  await knex('16person').insert([
    {"16id": 1, "16person": '建築家', "supple":"主義のためには岩のように立ち上がれ"},
    {"16id": 2, "16person": '論理学者', "supple":"智は驚きから生まれる"},
    {"16id": 3, "16person": '指揮官', "supple":"幸福とは達成する喜びの中にある"},
    {"16id": 4, "16person": '討論者', "supple":"何かを成し遂げようとしている時、ルールなどない！"},
    {"16id": 5, "16person": '提唱者', "supple":"また一日くじけずに頑張る"},
    {"16id": 6, "16person": '仲介者', "supple":"今の自分のことは分かっているが、今後どうなるかは分からない"},
    {"16id": 7, "16person": '主人公', "supple":"人々を固く信じている"},
    {"16id": 8, "16person": '運動家', "supple":"喜びを探し求める"},
    {"16id": 9, "16person": '管理者', "supple":"自分の評判を重んじるのなら、質の高い人間と交際すべし"},
    {"16id": 10, "16person": '擁護者', "supple":"あなたを守れるのなら守ります"},
    {"16id": 11, "16person": '幹部', "supple":"誰もが、自分が正しいと信じる物事を支持する価値がある"},
    {"16id": 12, "16person": '領事', "supple":"“責任ある生き方”の美点"},
    {"16id": 13, "16person": '巨匠', "supple":"人と違うことを恐れるな"},
    {"16id": 14, "16person": '冒険家', "supple":"あるがままでいられるのが幸せ"},
    {"16id": 15, "16person": '起業家', "supple":"動作と行動を取り違えてはいけない"},
    {"16id": 16, "16person": 'エンターテイナー', "supple":"私たちは誰もがスター"},
  ]);
};
