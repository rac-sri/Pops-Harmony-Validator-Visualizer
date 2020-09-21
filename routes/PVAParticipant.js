var express = require("express");
var router = express.Router();
const PVAParticipants = require("../models/PVAParticipants");
const Results = require("../models/Game");

router.get("/", async function (req, res) {
  const data = await PVAParticipants.find({});
  console.log(data);
  res.send(data);
  res.end();
});

router.get("/:pvadd", async function (req, res) {
  const data = await PVAParticipants.findOne({
    validatorAddress: req.params.pvadd,
  }).populate("results");
  res.status(200).send(data);
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

module.exports = router;
