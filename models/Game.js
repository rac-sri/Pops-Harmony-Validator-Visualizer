const mongoose = require("mongoose");
const { db } = require("./PVAParticipants");

// TODO: remove pvaUser from here and the ref to participant (faster query participant wise)

const schema = mongoose.Schema({
  pvaUser: {
    type: String,
    ref: "pvaparticipants",
  },
  gameName: {
    type: String,
    required: true,
  },
  gameResult: {
    type: Number,
    required: true,
    default: 0,
  },
});

const model = mongoose.model("results", schema);

module.exports = model;
