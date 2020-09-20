var express = require("express");
var router = express.Router();
const PVAParticipants = require("../models/PVAParticipants");
const Results = require("../models/Result");

router.get("/", async function (req, res) {
  console.log("deqwundwoiq");
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

router.put("/:id", async (req, res) => {
  const body = req.body;
  const resutl = await PVAParticipants.findByIdAndUpdate(req.params.id, body);
  res.status(200).send(resutl.id);
  res.end();
});

router.put("/add/:pvaadd", async (req, res) => {
  const body = req.body;
  const result = await PVAParticipants.findOneAndUpdate(
    { validatorAddress: req.params.pvaadd },
    body,
    { new: true }
  );
  res.status(200).send({ result: "ok", object: result });
});

router.delete("/:id", async (req, res) => {
  const pvauser = await PVAParticipants.findByIdAndDelete(req.params.id);
  res.status(200).send({ result: "ok" });
  res.end();
});

router.get("/results", async function (req, res) {
  console.log("dn913ndon128d");
  const data = await Results.find({});
  console.log(data);
  res.send(data);
  res.end();
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

router.post("/:pvaid:/results", async (req, res) => {
  const body = req.body;
  console.log(body);
  const search = Results.create(body);
  res.status(200).send({ id: search.id });
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
  console.log(body);
  Results.findOneAndUpdate(
    { pvauser: req.query.pvaid, gamename: req.query.challengename },
    body
  );
  res.status(200).send({ result: "ok" });
});

router.get("/add/:pvaadd/results/:challengename", async (req, res) => {
  console.log("d132nd9812n9o");
  const pvaid = await PVAParticipants.findOne({
    validatoraddress: req.query.pvaadd,
  });
  const result = await Results.findOne({
    pvauser: pvaid,
    gamename: req.params.challengename,
  }).populate();
  console.log(result);
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

  const result = await Results.findOneAndUpdate(
    { pvaUser: pvaobj.id, gameName: req.params.challengename },
    body,
    { new: true }
  );
  res.status(200).send({ result: "ok", message: result });
});

module.exports = router;
