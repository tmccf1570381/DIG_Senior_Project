/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('profiles').del()
  await knex('profiles').insert([
    {"user-id": 10001, "16person": 'エンターテイナー', "team":"-","position": "Developer"},
    {"user-id": 10002, "16person": '指揮官', "team":"-","position": "Developer"},
    {"user-id": 10003, "16person": '主人公', "team":"-","position": "Developer"},
    {"user-id": 10004, "16person": '擁護者', "team":"-","position": "Developer"},
    {"user-id": 10005, "16person": '領事', "team":"-","position": "Developer"},
    {"user-id": 10006, "16person": '提唱者', "team":"-","position": "Developer"},
    {"user-id": 10007, "16person": '擁護者', "team":"-","position": "Developer"},
    {"user-id": 10008, "16person": '-', "team":"-","position": "Developer"},
    {"user-id": 10009, "16person": '領事', "team":"-","position": "Developer"},
    {"user-id": 10010, "16person": '-', "team":"-","position": "Developer"},
    {"user-id": 10011, "16person": '論理学者', "team":"-","position": "Developer"},
    {"user-id": 10012, "16person": '冒険家', "team":"-","position": "Developer"},
    {"user-id": 10013, "16person": '-', "team":"-","position": "Developer"},
    {"user-id": 10014, "16person": '-', "team":"-","position": "Developer"},
    {"user-id": 10015, "16person": '-', "team":"-","position": "Developer"},
    {"user-id": 10016, "16person": '仲介者', "team":"-","position": "Developer"},
    {"user-id": 10017, "16person": '-', "team":"-","position": "Developer"},
    {"user-id": 10018, "16person": '冒険家', "team":"-","position": "Developer"},
    {"user-id": 10019, "16person": '-', "team":"-","position": "Developer"},
    {"user-id": 10020, "16person": '-', "team":"-","position": "Developer"},
    {"user-id": 10021, "16person": '運動家', "team":"-","position": "Developer"},
    {"user-id": 10022, "16person": '-', "team":"-","position": "Developer"},
    {"user-id": 10023, "16person": '討論者', "team":"-","position": "Designer"},
    {"user-id": 10024, "16person": 'エンターテイナー', "team":"-","position": "ProductManeger"},
    {"user-id": 10025, "16person": '指揮官', "team":"-","position": "Developer"},
  ]);
};
