var express = require("express");
var router = express.Router();
const PVAParticipants = require("../models/PVAParticipants");
const Results = require("../models/Results");

router.get("/", async function (req, res) {
  const data = await PVAParticipants.find({});
  console.log(data);
  res.send(data);
  res.end();
});

router.post("/", async function (req, res) {
  const data = { ...req.body };
  console.log(data);
  const savedData = await PVAParticipants.create(data);
  res.status(200).send({ id: savedData.id });
});

router.put("/:id", (req, res) => {
  const body = req.body;
  PVAParticipants.findByIdAndUpdate(req.query.params, body);
  res.status(200);
  res.end();
});

router.put("/add/:pvaadd",  (req, res) => {
  const body = req.body;
  console.log(body);
  PVAParticipants.findOneAndUpdate(req.params.pvaadd, body);
  res.status(200).send({result : "ok"})
});

router.delete("/:id",(res,res)=>{
  const pvauser = await PVAParticipants.findByIdAndDelete(req.params.id);
   res.status(200).send({"result":"ok"});
   res.end();
})

router.get("/:id",(req,res)=>{
  const pvauser = PVAParticipants.findById(req.params.id);
  res.status(200).send(pvauser);
})


router.get("/results", async function (req, res) {
  const data = await Results.find({});
  console.log(data);
  res.send(data);
  res.end();
});

router.get('/:pvaid/results',async function(req,res){
  const result = await Results.findByIdAndUpdate(req.params.pvaid,req.body);
  res.status(200).send(result);
})

router.post('/:pvaid:/results', async (req,res)=>{
  const body = req.body;
  console.log(body);
  const search = Results.create(body);
  res.status(200).send({id: search.id});
})

router.get('/:pvaid/results/:challengename',async (req,res)=>{
  const result = await  Results.findOne({pvauser: req.params.pvaid, gamename: req.params.challengename});
  res.send(200).send(result);
})

router.put('/:pvaid/results/:challengename', async (req,res)=>{
  const body = req.body;
  console.log(body);
  Results.findOneAndUpdate({pvauser: req.query.pvaid, gamename: req.query.challengename}, body);
  res.status(200).send({"result":"ok"});
})

router.get('/add/:pvaadd/results/:challengename', async (req,res)=>{
  const pvaid = await PVAParticipants.findOne({validatoraddress:req.query.pvaadd});
  const result = await Results.findOne({pvauser:pvaid, gamename: req.params.challengename}).populate();
  console.log(result);
  res.status(200).send(result);
})

router.put('/add/:pvaadd/result/:challengename',(req,res)=>{
  const body = req.body;
  console.log(body)

  const pvaobj = await PVAParticipants.findOne({validatoraddress:pvaadd});
  
  Results.findOneAndUpdate({pvause: pvaobj.id, gamename : challengename} , body);
  res.status(200).send({result:"ok","message":challengename});
})

router.post('/add/:pvaadd/results/:challengename',async (req,res)=>{
  const body = req.body;

  const pvaobj = await PVAParticipants.findOne({validatoraddress:req.params.pvaadd});

  console.log(pvaobj);

  const content={
    "pvauser": pvaobj.id,
    "gamename": challengename,
    "gameresult": 1
}
Results.create(content);
res.status(200).send( {"result":"ok","message":"game-created"})
})


module.exports = router;
