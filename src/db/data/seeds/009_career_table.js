/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('career').del()
  await knex('career').insert([
    {"user-id": 10004, career: 'お客様関連部',"date-c":"2008/04"},
    {"user-id": 10004, career: 'カスタマーファースト統括部',"date-c":"2023/01"},
    {"user-id": 10004, career: 'デジタル変革推進室',"date-c":"2023/04"},
    {"user-id": 10023, career: '品質保証部',"date-c":"2009/04"},
    {"user-id": 10023, career: 'コーポレートIT部',"date-c":"2020/04"},
    {"user-id": 10023, career: '品質保証部',"date-c":"2021/04"},
    {"user-id": 10023, career: 'カスタマーファースト統括部',"date-c":"2023/01"},
    {"user-id": 10023, career: 'デジタル変革推進室',"date-c":"2023/04"},
    {"user-id": 10024, career: '品質保証部',"date-c":"2013/04"},
    {"user-id": 10024, career: 'トヨタ自動車九州',"date-c":"2016/01"},
    {"user-id": 10024, career: '品質保証部',"date-c":"2017/01"},
    {"user-id": 10024, career: 'カスタマーファースト統括部',"date-c":"2023/01"},
    {"user-id": 10024, career: 'デジタル変革推進室',"date-c":"2023/04"},
    {"user-id": 10025, career: 'お客様関連部',"date-c":"2016/04"},
    {"user-id": 10025, career: '東京技術部',"date-c":"2019/01"},
    {"user-id": 10025, career: 'お客様関連部',"date-c":"2020/01"},
    {"user-id": 10025, career: 'コーポレートIT部',"date-c":"2020/04"},
    {"user-id": 10025, career: 'カスタマーファースト統括室',"date-c":"2021/04"},
    {"user-id": 10025, career: 'デジタル変革推進室',"date-c":"2023/04"},
  ]);
};
