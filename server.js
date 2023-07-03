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

app.get("/posted", async (req, res) => {
  const review = await knex.from("review");
  const good = await knex.from("good");
  const posted = await knex.from("posted")
  .leftJoin("users","posted.user-id", "users.user-id")
  .select(["id","posted.user-id", "title","post-date","tag","url","first-name","last-name","doctype"]);

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
  .select(["id","posted.user-id","title","post-date","tag","url","first-name","last-name","doctype"]);
  const review = await knex.from("review");
  const good = await knex.from("good");
  const response = posted.map(e=>({
    ...e, 
    review: review.filter(i=> i.id === e.id).map(e=>e.comment),
    zamas: good.filter(i=> i.id === e.id).length
  }));
  res.status(200).send(response);
});

app.delete("/posted", async (req, res) => {
  await knex.from("good").where("id", "=", req.body.id).del();
  await knex.from("review").where("id", "=", req.body.id).del();
  await knex.from("posted").where("id", "=", req.body.id).del();

  res.send({test:"ol"})
})

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
  .select(["id","posted.user-id","title","post-date","tag","url","first-name","last-name","doctype"]);

  const response = posted.map(e=>({...e, 
    review: review.filter(i=> i.id === e.id).map(e=>e.comment),
    zamas: good.filter(i=> i.id === e.id).length
  }));
  res.status(200).send(response);
});

app.post("/review", async (req,res) => {
  await knex.from("review").where("id", "=", req.body["id"]).del();
  const insertObj = req.body.review.reduce((init,val)=>([...init,{id:req.body.id,comment:val}]),[])
  await knex('review').insert(insertObj);
});

app.get("/params", async (req, res) => {
  res.send({Auth: {
    region: process.env.COG_REGION,
    userPoolId: process.env.COG_POOL,
    userPoolWebClientId: process.env.COG_CLIENT,
    signUpVerificationMethod: 'link', 
    authenticationFlowType: 'USER_SRP_AUTH',
  },
  Storage: {
    AWSS3: {
        bucket: 'dig-zamas-prof',
        region: process.env.COG_REGION,
    }
  }
});
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

