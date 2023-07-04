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
    {"user-id": 10001, "first-name": '久場', "last-name":"智宏","mail": "tomohiro_kuba@mail.toyota.co.jp","16id":16,"role":"Developper"},
    {"user-id": 10002, "first-name": '宮城', "last-name":"恒太郎","mail": "kotaro_miyagi@mail.toyota.co.jp","16id":3,"role":"Developper"},
    {"user-id": 10003, "first-name": '菊地', "last-name":"慧","mail": "satoru_kikuchi@mail.toyota.co.jp","16id":7,"role":"Developper"},
    {"user-id": 10004, "first-name": '浅井', "last-name":"綾乃","mail": "ayano_kondo@mail.toyota.co.jp","16id":10,"role":"Developper"},
    {"user-id": 10005, "first-name": '森﨑', "last-name":"陽平","mail": "m.yoo.hee117@gmail.com","16id":12,"role":"Developper"},
    {"user-id": 10006, "first-name": '皿井', "last-name":"進","mail": "susumu_sarai@mail.toyota.co.jp","16id":5,"role":"Developper"},
    {"user-id": 10007, "first-name": '萩', "last-name":"巧実","mail": "takumi_hagi@mail.toyota.co.jp","16id":10,"role":"Developper"},
    {"user-id": 10008, "first-name": '坂本', "last-name":"龍征","mail": "riyusei_sakamoto@mail.toyota.co.jp","role":"Developper"},
    {"user-id": 10009, "first-name": '馬場', "last-name":"祥也","mail": "shiyoya_baba@mail.toyota.co.jp","16id":12,"role":"Developper"},
    {"user-id": 10010, "first-name": '太田', "last-name":"幸秀","mail": "yukihide_ohta@mail.toyota.co.jp","role":"Developper"},
    {"user-id": 10011, "first-name": '木田', "last-name":"裕一","mail": "yuichi_kida@mail.toyota.co.jp","16id":2,"role":"Developper"},
    {"user-id": 10012, "first-name": '早川', "last-name":"笙子","mail": "shoko_hasegawa@mail.toyota.co.jp","16id":14,"role":"Developper"},
    {"user-id": 10013, "first-name": '水本', "last-name":"徳和","mail": "norikazu_mizumoto@mail.toyota.co.jp","role":"Developper"},
    {"user-id": 10014, "first-name": '山崎', "last-name":"佑未","mail": "yumi_yamasaki@mail.toyota.co.jp","role":"Developper"},
    {"user-id": 10015, "first-name": '森', "last-name":"康平","mail": "kohei_mori_ac@mail.toyota.co.jp","role":"Developper"},
    {"user-id": 10016, "first-name": '井上', "last-name":"雅俊","mail": "masatoshi_inoue_aa@mail.toyota.co.jp","16id":6,"role":"Developper"},
    {"user-id": 10017, "first-name": '浅岡', "last-name":"卓哉","mail": "takuya.asaoka@mail.toyota-body.co.jp","16id":1,"role":"Developper"},
    {"user-id": 10018, "first-name": '板倉', "last-name":"奨歩","mail": "shouho.itakura@mail.toyota-body.co.jp","16id":14,"role":"Developper"},
    {"user-id": 10019, "first-name": '前川', "last-name":"智","mail": "satoshi_maekawa_aa@mail.toyota.co.jp","role":"Developper"},
    {"user-id": 10020, "first-name": '松原', "last-name":"由宜","mail": "yoshinori_matsubara@mail.toyota.co.jp","role":"Developper"},
    {"user-id": 10021, "first-name": '斉藤', "last-name":"塁","mail": "rui_saito@mail.toyota.co.jp","16id":8,"role":"Developper"},
    {"user-id": 10022, "first-name": '福島', "last-name":"雅史","mail": "masafumi_fukushima_aa@mail.toyota.co.jp","role":"Developper"},
    {"user-id": 10023, "first-name": '西村', "last-name":"明彦","mail": "akihiko_nishimura@mail.toyota.co.jp","16id":4,"role":"Designer"},
    {"user-id": 10024, "first-name": '津留', "last-name":"啓吾","mail": "keigo_tsuru@mail.toyota.co.jp","16id":16,"role":"ProductManager"},
    {"user-id": 10025, "first-name": '田邊', "last-name":"諒人","mail": "makoto_tanabe@mail.toyota.co.jp","16id":3,"role":"Developper"},
    {"user-id": 10026, "first-name": '前垣', "last-name":"慶大","mail": "keita_maegaki@mail.toyota.co.jp","16id":16,"role":"Youtuber"},
    {"user-id": 10027, "first-name": '内木', "last-name":"悠一","mail": "yuichi_naiki@mail.toyota.co.jp","16id":10,"role":"Designer"},
    {"user-id": 10028, "first-name": 'Ai', "last-name":"さん","mail": "ai.k@codechrysalis.io","role":"Teacher"},
    {"user-id": 10029, "first-name": '又吉', "last-name":"研太","mail": "kenta_matayoshi@mail.toyota.co.jp","role":"ProductManager"},
    {"user-id": 10030, "first-name": '和田', "last-name":"良夫","mail": "bells@mail.toyota.co.jp","role":"ProductManager"},
    {"user-id": 10031, "first-name": '保田', "last-name":"陸人","mail": "rikuto_yasuda@mail.toyota.co.jp","role":"Designer"},
    {"user-id": 10032, "first-name": '河邉', "last-name":"亮介","mail": "bacon0423@gmail.com","role":"ProductManager"},
    {"user-id": 10033, "first-name": '河合', "last-name":"心","mail": "shin_kawaai@mail.toyota.co.jp","role":"Designer"},
    {"user-id": 10034, "first-name": '濱', "last-name":"昭平","mail": "shohei_hama@mail.toyota.co.jp","role":"Designer"},
    {"user-id": 10035, "first-name": '加藤', "last-name":"雅之","mail": "masayuki_katou@mail.toyota.co.jp","role":"ProductManager"},
    {"user-id": 10036, "first-name": '高橋', "last-name":"龍","mail": "ryo_takahashi_ad@mail.toyota.co.jp","role":"ProductManager"},
    {"user-id": 10037, "first-name": '三浦', "last-name":"哲","mail": "satoshi_miura_ab@mail.toyota.co.jp","role":"Designer"},
    {"user-id": 10038, "first-name": '南', "last-name":"彰一","mail": "shoichi_minami_aa@mail.toyota.co.jp","role":"ProductManager"},
    {"user-id": 10039, "first-name": 'hisadomi', "last-name":"智史","mail": "satoshi_hisadomi@mail.toyota.co.jp","role":"Designer"},
    {"user-id": 10040, "first-name": '田之上', "last-name":"大樹","mail": "takeki_tanoue@mail.toyota.co.jp","role":"Designer"},
    {"user-id": 10041, "first-name": '笠井', "last-name":"雄太","mail": "YUUTA.KASAI@mail.toyota-body.co.jp","role":"Designer"},
    {"user-id": 10042, "first-name": '畠山', "last-name":"善幸","mail": "yoshiyuki_hatakeyama@mail.toyota.co.jp","role":"ProductManager"},
    {"user-id": 10043, "first-name": '水谷', "last-name":"洋美","mail": "hiromi_mizutani_aa@mail.toyota.co.jp","role":"Designer"},
    {"user-id": 10044, "first-name": '伊藤', "last-name":"隆晴","mail": "takaharu@mail.toyota.co.jp","role":"ProductManager"},
    {"user-id": 10045, "first-name": 'あびる', "last-name":"まん","mail": "kunimi.abiru@toyota.global","role":"Designer"},
    ]);
};
