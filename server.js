require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const knex = require("./src/db/index");
const app = express();
const PORT = 3456;

app.listen(PORT, () => {
  console.log(process.env.DB_HOST);
  console.log(process.env.DB_DATABASE);
  console.log(process.env.NODE_ENV);
  console.log(`Server is running ${PORT} !`);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"./build")));

app.get("/test", async (req,res)=>{
  res.status(200).send("test");
})

app.get("/user-list/:id", async (req, res)=>{
    const data = await knex.from("user")
    .leftJoin("profiles","user.user-id","profiles.user-id")
    .where("user.user-id","=",req.params.id)
    .select(["user.user-id","user.first-name","user.last-name","profiles.16person","profiles.team","profiles.position"])
    const skill = await knex.from("skill");
    const response = data.map(e => ({...e, skill:skill.filter(data => data["user-id"]===e["user-id"])
    .map(e=>({skill:e.skill,date:e.date}))}));
    res.status(200).send(response[0]);
});

app.post("/new-skill", async (req,res)=>{
  await knex("skill").insert(req.body);
  const data = await knex.from("user")
  .leftJoin("profiles","user.user-id","profiles.user-id")
  .where("user.user-id","=",req.body["user-id"])
  .select(["user.user-id","user.first-name","user.last-name","profiles.16person","profiles.team","profiles.position"])
  const skill = await knex.from("skill");
  const response = data.map(e => ({...e, skill:skill.filter(data => data["user-id"]===e["user-id"])
  .map(e=>({skill:e.skill,date:e.date}))}))
  res.status(200).send(response[0]);
})

app.put("/",(req, res)=>{
    res.status(200).send("ok:put");
});

app.delete("/skill",async (req, res)=>{
  await knex("skill")
  .where("skill.user-id","=",req.body["user-id"])
  .where("skill.skill","=",req.body.skill)
  .delete(["user-id","skill","comment","date","skill-id"]);
  await knex("skill").insert(req.body);
  const data = await knex.from("user")
  .leftJoin("profiles","user.user-id","profiles.user-id")
  .where("user.user-id","=",req.body["user-id"])
  .select(["user.user-id","user.first-name","user.last-name","profiles.16person","profiles.team","profiles.position"])
  const skill = await knex.from("skill");
  const response = data.map(e => ({...e, skill:skill.filter(data => data["user-id"]===e["user-id"])
  .map(e=>({skill:e.skill,date:e.date}))}))
  res.status(200).send(response[0]);
});

app.get("/posted", async (req, res) => {
  const data = await knex.from("posted")
  .leftJoin("good", "posted.id", "good.g-id")
  .leftJoin("user","posted.user-id", "user.user-id")
  .select(["id","title","post-date","zamas","tag","url","pict","user.user-id","zamas","first-name","last-name"]).then((e) => e);
  const review = await knex.from("posted").rightJoin('review', 'posted.id', 'review.r-id')
  .select(["id","comment"]).then(e => e);
  const response = data.map(e=>({...e,review:review.filter(i=> i.id === e.id).map(e=>e.comment)}));
  response.sort((a, b)=> (a.id < b.id) ? -1 : 1);
  res.status(200).send(response);
});

app.post("/posted", async (req, res) => {
  const id = await knex("posted").max('id').then(e=>e[0].max +1);
  const revid = await knex("review").max('rev-id').then(e=>e[0].max +1);
  await knex("posted").insert({...req.body.posted, id});
  await knex("good").insert({"g-id":id, zamas:0});
  await knex("review").insert({comment: req.body.comment, "r-id": id,"rev-id": revid});
  const data = await knex.from("posted")
  .leftJoin("good", "posted.id", "good.g-id")
  .leftJoin("user","posted.user-id", "user.user-id")
  .select(["id","title","post-date","zamas","tag","url","pict","user.user-id","zamas","first-name","last-name"]).then((e) => e);
  const review = await knex.from("posted").rightJoin('review', 'posted.id', 'review.r-id')
  .select(["id","comment"]).then(e => e);
  const response = data.map(e=>({...e,review:review.filter(i=> i.id === e.id).map(e=>e.comment)}));
  response.sort((a, b)=> (a.id < b.id) ? -1 : 1);
  res.status(200).send(response);
});

app.post("/good", async (req, res) => {
  const zamas = await knex.from("good").where("g-id","=",req.body["g-id"]).select("zamas");
  await knex.from("good").where("g-id","=",req.body["g-id"]).update({'zamas':zamas[0].zamas+1}, ['g-id', 'zamas']);
  const data = await knex.from("posted")
  .leftJoin("good", "posted.id", "good.g-id")
  .leftJoin("user","posted.user-id", "user.user-id")
  .select(["id","title","post-date","zamas","tag","url","pict","user.user-id","zamas","first-name","last-name"]).then((e) => e);
  const review = await knex.from("posted").rightJoin('review', 'posted.id', 'review.r-id')
  .select(["id","comment"]).then(e => e);
  const response = data.map(e=>({...e,review:review.filter(i=> i.id === e.id).map(e=>e.comment)}));
  response.sort((a, b)=> (a.id < b.id) ? -1 : 1);
  res.status(200).send(response);
});

app.post("/user", async (req, res) => {
  const record = await knex.from("record").select("*")
  .then(e=> e.filter(e => e["r-user-id"] === Number(req.body["user-id"])).map(e=>e["rr-id"]));
  const userData = await knex.from("user")
    .where("user-id", "=", req.body["user-id"])
    .where("password", "=", req.body.password)
    .select(["user-id","first-name","last-name"]);
  userData.length > 0 ? res.status(200).send([{...userData[0], record}]) : res.status(200).send(false);
});

app.post("/singnup", async (req,res) =>{
  const check = await knex.from("user").where("user-id", "=", req.body["user-id"]);
  if(check.length > 0){
    res.status(200).send("1");
  }else{
    await knex("user").insert(req.body);
    res.status(200).send("2");
  };
})
