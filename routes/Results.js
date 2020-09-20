var express = require("express");
var router = express.Router();
const PVAParticipants = require("../models/PVAParticipants");
const Results = require("../models/Result");

router.get("/", async function (req, res) {
  const data = await Results.find({});
  res.send(data);
  res.end();
});

router.post("/", async (req, res) => {
  const body = req.body;
  const search = Results.create(body);
  res.status(200).send({ id: search.id });
});

router.get("/:id", async (req, res) => {
  const pvauser = await PVAParticipants.findById(req.params.id);
  res.status(200).send(pvauser);
});

router.get("/:pvaid/results", async function (req, res) {
  console.log("correct");
  const result = await Results.findByIdAndUpdate(
    { pvaUser: req.params.pvaid },
    req.body
  );
  res.status(200).send(result);
});

router.get("/:pvaid/results/:challengename", async (req, res) => {
  const result = await Results.findOne({
    pvauser: req.params.pvaid,
    gamename: req.params.challengename,
  });
  res.send(200).send(result);
});

router.put("/:pvaid/results/:challengename", async (req, res) => {
  const body = req.body;
  Results.findOneAndUpdate(
    { pvauser: req.query.pvaid, gamename: req.query.challengename },
    body
  );
  res.status(200).send({ result: "ok" });
});

router.get("/add/:pvaadd/results/:challengename", async (req, res) => {
  const pvaid = await PVAParticipants.findOne({
    validatorAddress: req.params.pvaadd,
  });
  const result = await Results.findOne({
    pvaUser: pvaid.validatorAddress,
    gameName: req.params.challengename,
  }).populate();
  res.status(200).send(result);
});

router.post("/add/:pvaadd/results/:challengename", async (req, res) => {
  const body = req.body;

  const pvaobj = await PVAParticipants.findOne({
    validatorAddress: req.params.pvaadd,
  });

  const content = {
    pvaUser: pvaobj.id,
    gameName: req.params.challengename,
    gameResult: 1,
  };
  const result = await Results.create(content);
  res.status(200).send({ result: "ok", message: result });
});

router.put("/add/:pvaadd/results/:challengename", async (req, res) => {
  const body = req.body;
  console.log(body);

  const pvaobj = await PVAParticipants.findOne({
    validatorAddress: req.params.pvaadd,
  });

  console.log(pvaobj);

  const result = await Results.findOneAndUpdate(
    { pvaUser: pvaobj.validatorAddress, gameName: req.params.challengename },
    body,
    { new: true }
  );
  res.status(200).send({ result: "ok", message: result });
});

module.exports = router;
