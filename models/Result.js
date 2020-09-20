const mongoose = require("mongoose");
const { db } = require("./PVAParticipants");

// TODO: remove pvaUser from here and the ref to participant (faster query participant wise)

const schema = mongoose.Schema({
  pvaUser: {
    type: String,
    ref: "PVAParticipants",
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
  // meta: {
  //   indexes: [{ fields: { pvaUser: "gameName" }, unique: true }],
  // },
});

const model = mongoose.model("result", schema);

module.exports = model;
