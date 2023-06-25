/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('good').del();
  await knex('review').del();
  await knex('posted').del();
  await knex('skill').del();
  await knex('skilllist').del();
  await knex('16person').del()
  await knex('explain').del();
  await knex('career').del();
  await knex('users').del();
  await knex('users').insert([
    {"user-id": 10001, "first-name": '久場', "last-name":"智宏","password": "admin","16id":16,"role":"Developper"},
    {"user-id": 10002, "first-name": '宮城', "last-name":"恒太郎","password": "admin","16id":3,"role":"Developper"},
    {"user-id": 10003, "first-name": '菊地', "last-name":"慧","password": "admin","16id":7,"role":"Developper"},
    {"user-id": 10004, "first-name": '浅井', "last-name":"綾乃","password": "admin","16id":10,"role":"Developper"},
    {"user-id": 10005, "first-name": '森﨑', "last-name":"陽平","password": "admin","16id":12,"role":"Developper"},
    {"user-id": 10006, "first-name": '皿井', "last-name":"進","password": "admin","16id":5,"role":"Developper"},
    {"user-id": 10007, "first-name": '萩', "last-name":"巧実","password": "admin","16id":10,"role":"Developper"},
    {"user-id": 10008, "first-name": '坂本', "last-name":"龍征","password": "admin","role":"Developper"},
    {"user-id": 10009, "first-name": '馬場', "last-name":"祥也","password": "admin","16id":12,"role":"Developper"},
    {"user-id": 10010, "first-name": '太田', "last-name":"幸秀","password": "admin","role":"Developper"},
    {"user-id": 10011, "first-name": '木田', "last-name":"裕一","password": "admin","16id":2,"role":"Developper"},
    {"user-id": 10012, "first-name": '早川', "last-name":"笙子","password": "admin","16id":14,"role":"Developper"},
    {"user-id": 10013, "first-name": '水本', "last-name":"徳和","password": "admin","role":"Developper"},
    {"user-id": 10014, "first-name": '山崎', "last-name":"佑未","password": "admin","role":"Developper"},
    {"user-id": 10015, "first-name": '森', "last-name":"康平","password": "admin","role":"Developper"},
    {"user-id": 10016, "first-name": '井上', "last-name":"雅俊","password": "admin","16id":6,"role":"Developper"},
    {"user-id": 10017, "first-name": '浅岡', "last-name":"卓哉","password": "admin","16id":1,"role":"Developper"},
    {"user-id": 10018, "first-name": '板倉', "last-name":"奨歩","password": "admin","16id":14,"role":"Developper"},
    {"user-id": 10019, "first-name": '前川', "last-name":"智","password": "admin","role":"Developper"},
    {"user-id": 10020, "first-name": '松原', "last-name":"由宜","password": "admin","role":"Developper"},
    {"user-id": 10021, "first-name": '斉藤', "last-name":"塁","password": "admin","16id":8,"role":"Developper"},
    {"user-id": 10022, "first-name": '福島', "last-name":"雅史","password": "admin","role":"Developper"},
    {"user-id": 10023, "first-name": '西村', "last-name":"明彦","password": "admin","16id":4,"role":"Designer"},
    {"user-id": 10024, "first-name": '津留', "last-name":"啓吾","password": "admin","16id":16,"role":"ProductManager"},
    {"user-id": 10025, "first-name": '田邊', "last-name":"諒人","password": "admin","16id":3,"role":"Developper"},
    {"user-id": 10026, "first-name": '前垣', "last-name":"慶大","password": "admin","16id":16,"role":"Youtuber"},
    {"user-id": 10027, "first-name": '内木', "last-name":"悠一","password": "admin","16id":10,"role":"Designer"},
    ]);
};