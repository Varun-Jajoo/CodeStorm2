const express = require("express");
const collection=require('./mongo')
const cors = require("cors");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res)=>{
  collection.find({}).select('name age').exec((err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
})
app.post("/",async(req,res)=>{
  const {level,name,age,phn_num,depend,area,lst_mnth_sav,ann_inc}=req.body
  const data={
    level:level,
    name:name,
    age:age,
    phn_num:phn_num,
    depend:depend,
    area:area,
    lst_mnth_sav:lst_mnth_sav,
    ann_inc:ann_inc,

  }
  await collection.insertMany([data])
})
app.listen(8000,()=>{
  console.log("port connected")
})