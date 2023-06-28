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
    {"user-id": 10028, "first-name": 'Ai', "last-name":"さん","password": "admin","role":"Teacher"},
    {"user-id": 10029, "first-name": '又吉', "last-name":"研太","password": "admin","role":"ProductManager"},
    {"user-id": 10030, "first-name": '和田', "last-name":"良夫","password": "admin","role":"ProductManager"},
    {"user-id": 10031, "first-name": '保田', "last-name":"陸人","password": "admin","role":"Designer"},
    {"user-id": 10032, "first-name": '河邉', "last-name":"亮介","password": "admin","role":"ProductManager"},
    {"user-id": 10033, "first-name": '河合', "last-name":"心","password": "admin","role":"Designer"},
    {"user-id": 10034, "first-name": '濱', "last-name":"昭平","password": "admin","role":"Designer"},
    {"user-id": 10035, "first-name": '加藤', "last-name":"雅之","password": "admin","role":"ProductManager"},
    {"user-id": 10036, "first-name": '高橋', "last-name":"龍","password": "admin","role":"ProductManager"},
    {"user-id": 10037, "first-name": '三浦', "last-name":"哲","password": "admin","role":"Designer"},
    {"user-id": 10038, "first-name": '南', "last-name":"彰一","password": "admin","role":"ProductManager"},
    {"user-id": 10039, "first-name": 'hisadomi', "last-name":"智史","password": "admin","role":"Designer"},
    {"user-id": 10040, "first-name": '田之上', "last-name":"大樹","password": "admin","role":"Designer"},
    {"user-id": 10041, "first-name": '笠井', "last-name":"雄太","password": "admin","role":"Designer"},
    {"user-id": 10042, "first-name": '畠山', "last-name":"善幸","password": "admin","role":"ProductManager"},
    {"user-id": 10043, "first-name": '水谷', "last-name":"洋美","password": "admin","role":"Designer"},
    {"user-id": 10044, "first-name": '伊藤', "last-name":"隆晴","password": "admin","role":"ProductManager"},
    {"user-id": 10045, "first-name": 'あびる', "last-name":"まん","password": "admin","role":"Designer"},
    ]);
};
