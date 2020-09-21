var express = require("express");
var router = express.Router();
const PVAParticipants = require("../models/PVAParticipants");
const Game = require("../models/Game");

router.get("/", async function (req, res) {
  const data = await Game.find({});
  res.send(data);
  res.end();
});

router.get("/:gamename", async (req, res) => {
  console.log(req.params);
  const data = await Game.find({ gameName: req.params.gamename });
  res.status(200).send(data);
});

router.post("/", async (req, res) => {
  const body = req.body;
  const search = await Game.create(body);
  const addToParticipant = await PVAParticipants.findOneAndUpdate(
    { validatorAddress: body.pvaUser },
    { $push: { games: search.id } },
    { new: true }
  );
  console.log(addToParticipant);
  res.status(200).send({ value: addToParticipant });
});

router.get("/:pvaid/Game/:challengename", async (req, res) => {
  console.log(req.params);
  const result = await Game.findOne({
    pvaUser: req.params.pvaid,
    gameName: req.params.challengename,
  });
  res.status(200).send(result);
  res.end();
});

router.get("/add/:pvaadd/Game/:challengename", async (req, res) => {
  const pvaid = await PVAParticipants.findOne({
    validatorAddress: req.params.pvaadd,
  });
  const result = await Game.findOne({
    pvaUser: pvaid.validatorAddress,
    gameName: req.params.challengename,
  }).populate();
  res.status(200).send(result);
});

router.put("/add/:pvaadd/Game/:challengename", async (req, res) => {
  const body = req.body;
  console.log(req.params);

  const data = await Game.findOne({
    pvaUser: req.params.pvaadd,
    gameName: req.params.challengename,
  });
  console.log(data);
  const result = await Game.findOneAndUpdate(
    { pvaUser: req.params.pvaadd, gameName: req.params.challengename },
    body,
    { new: true }
  );
  res.status(200).send({ result: "ok", message: result });
});

module.exports = router;
