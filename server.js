require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const knex = require("./src/db/index");
const app = express();
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const PORT = 3456;

app.listen(PORT,async () => {
  console.log(process.env.DB_DATABASE);
  console.log(`Server is running ${PORT} !`);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.json());

app.post("/users", async (req, res) => {
  const userData = await knex.from("users")
    .where("user-id", "=", req.body["user-id"])
    .where("password", "=", req.body.password)
    .leftJoin("16person","users.16id","16person.16id").select(["user-id","first-name","last-name","role","16person","supple"])

  switch(userData.length){
    case 0:
      res.status(200).send(false);
      break;
    default:
      const career = await knex.from("career")
      .where("career.user-id","=",req.body["user-id"]).select(["career","date-c"]);
      const explain = await knex.from("explain")
      .where("explain.user-id","=",req.body["user-id"]).select(["experience","period","confidence"]);
      const skill = await knex.from("skill")
      .leftJoin("skilllist", "skill.skill-cd" , "skilllist.skill-cd")
      .where("skill.user-id","=",req.body["user-id"]).select(["skill","level","date"]);
      const good = await knex.from("good")
      .where("good.user-id","=",req.body["user-id"]).select("id").then(e=>e.map(i=>i.id));
      res.status(200).send({...userData[0], explain, career, skill, good});
      break;
  }
});

app.get("/posted", async (req, res) => {
  const review = await knex.from("review");
  const good = await knex.from("good");
  const posted = await knex.from("posted")
  .leftJoin("users","posted.user-id", "users.user-id")
  .select(["id","posted.user-id", "title","post-date","tag","url","first-name","last-name"]);

  const response = posted.map(e=>({...e, 
    review: review.filter(i=> i.id === e.id).map(e=>e.comment),
    zamas: good.filter(i=> i.id === e.id).length
  }));
  res.status(200).send(response);
});

app.post("/posted", async (req, res) => {
  await knex("posted").insert(req.body.posted);
  const id = await knex.from("posted").select("id").then(e => e.map(i => i.id))
  await knex("review").insert({id: Math.max(...id), comment: req.body.comment});

  const posted = await knex.from("posted")
  .leftJoin("users","posted.user-id", "users.user-id")
  .select(["id","posted.user-id","title","post-date","tag","url","first-name","last-name"]);
  const review = await knex.from("review");
  const good = await knex.from("good");
  const response = posted.map(e=>({
    ...e, 
    review: review.filter(i=> i.id === e.id).map(e=>e.comment),
    zamas: good.filter(i=> i.id === e.id).length
  }));
  res.status(200).send(response);
});

app.get("/good/:id", async (req, res) => {
  const good = await knex.from("good")
  .where("user-id", "=", req.params.id).then(e=>e.map(i=>i.id))
  res.status(200).send({favorite: good});
})

app.post("/good", async (req, res) => {
  const check = await knex.from("good")
  .where("user-id", "=", req.body["user-id"])
  .where("id", "=", req.body["id"]);

  if (check.length === 0){
    await knex("good").insert(req.body);
  }else{
    await knex.from("good")
    .where("user-id", "=", req.body["user-id"])
    .where("id", "=", req.body["id"]).del();
  }
  
  const review = await knex.from("review");
  const good = await knex.from("good");
  const posted = await knex.from("posted")
  .leftJoin("users","posted.user-id", "users.user-id")
  .select(["id","posted.user-id","title","post-date","tag","url","first-name","last-name"]);

  const response = posted.map(e=>({...e, 
    review: review.filter(i=> i.id === e.id).map(e=>e.comment),
    zamas: good.filter(i=> i.id === e.id).length
  }));
  res.status(200).send(response);
});

app.post("/new-skill", async (req,res)=>{
  await knex("skill").insert({...req.body,"skill-cd":Number(req.body["skill-cd"])});

  const users = await knex.from("users")
  .where("users.user-id","=",req.body["user-id"])
  .leftJoin("16person","users.16id","16person.16id").select(["user-id","first-name","last-name","role","16person","supple"]);
  const career = await knex.from("career")
  .where("career.user-id","=",req.body["user-id"]).select(["career","date-c"]);
  const explain = await knex.from("explain")
  .where("explain.user-id","=",req.body["user-id"]).select(["experience","period","confidence"]);
  const skill = await knex.from("skill")
  .leftJoin("skilllist", "skill.skill-cd" , "skilllist.skill-cd")
  .where("skill.user-id","=",req.body["user-id"]).select(["skill","level","date"]);
  const good = await knex.from("good")
  .where("good.user-id","=",req.body["user-id"]).select("id").then(e=>e.map(i=>i.id));

  res.status(200).send({...users[0], explain, career, skill, good});
})

app.delete("/skill",async (req, res)=>{
  const id = await knex.from("skilllist").then(e => e.filter(i=> i.skill === req.body.skill).map(e=>e["skill-cd"]))
  await knex.from("skill")
  .where("user-id", "=", req.body["user-id"])
  .where("date","=",req.body.date)
  .where("skill-cd", "=", id[0]).del();

  const users = await knex.from("users")
  .where("users.user-id","=",req.body["user-id"])
  .leftJoin("16person","users.16id","16person.16id").select(["user-id","first-name","last-name","role","16person","supple"]);
  const career = await knex.from("career")
  .where("career.user-id","=",req.body["user-id"]).select(["career","date-c"]);
  const explain = await knex.from("explain")
  .where("explain.user-id","=",req.body["user-id"]).select(["experience","period","confidence"]);
  const skill = await knex.from("skill")
  .leftJoin("skilllist", "skill.skill-cd" , "skilllist.skill-cd")
  .where("skill.user-id","=",req.body["user-id"]).select(["skill","level","date"]);
  const good = await knex.from("good")
  .where("good.user-id","=",req.body["user-id"]).select("id").then(e=>e.map(i=>i.id));

  res.status(200).send({...users[0], explain, career, skill, good});
});

app.post("/explain", async (req,res)=>{
  await knex("explain").insert(req.body);

  const users = await knex.from("users")
  .where("users.user-id","=",req.body["user-id"])
  .leftJoin("16person","users.16id","16person.16id").select(["user-id","first-name","last-name","role","16person","supple"]);
  const career = await knex.from("career")
  .where("career.user-id","=",req.body["user-id"]).select(["career","date-c"]);
  const explain = await knex.from("explain")
  .where("explain.user-id","=",req.body["user-id"]).select(["experience","period","confidence"]);
  const skill = await knex.from("skill")
  .leftJoin("skilllist", "skill.skill-cd" , "skilllist.skill-cd")
  .where("skill.user-id","=",req.body["user-id"]).select(["skill","level","date"]);
  const good = await knex.from("good")
  .where("good.user-id","=",req.body["user-id"]).select("id").then(e=>e.map(i=>i.id));

  res.status(200).send({...users[0], explain, career, skill, good});
})

app.delete("/explain",async (req, res)=>{
  await knex.from("explain")
  .where("user-id", "=", req.body["user-id"])
  .where("confidence", "=", req.body["confidence"])
  .where("experience", "=", req.body["experience"]).del();

  const users = await knex.from("users")
  .where("users.user-id","=",req.body["user-id"])
  .leftJoin("16person","users.16id","16person.16id").select(["user-id","first-name","last-name","role","16person","supple"]);
  const career = await knex.from("career")
  .where("career.user-id","=",req.body["user-id"]).select(["career","date-c"]);
  const explain = await knex.from("explain")
  .where("explain.user-id","=",req.body["user-id"]).select(["experience","period","confidence"]);
  const skill = await knex.from("skill")
  .leftJoin("skilllist", "skill.skill-cd" , "skilllist.skill-cd")
  .where("skill.user-id","=",req.body["user-id"]).select(["skill","level","date"]);
  const good = await knex.from("good")
  .where("good.user-id","=",req.body["user-id"]).select("id").then(e=>e.map(i=>i.id));

  res.status(200).send({...users[0], explain, career, skill, good});
});

app.post("/singnup", async (req,res) =>{
  const check = await knex.from("users").where("user-id", "=", req.body["user-id"]);
  if(check.length > 0){
    res.status(200).send("1");
  }else{
    await knex("users").insert(req.body);
    res.status(200).send("2");
  };
});

app.get("/aws/:id", async (req, res)=>{
  const client = new S3Client({ 
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.S3_KEY,
        secretAccessKey:process.env.S3_SKEY}
  });

  const result = await client.send(
    new GetObjectCommand({
      Bucket: 'dig-zamas-prof',
      Key: `${req.params.id}.png`
    })
  ).catch(e=>e);

  const arr = await result.Body?.transformToString("base64");
  res.status(200).send({src:arr})
})