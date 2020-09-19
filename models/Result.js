const mongoose = require("mongoose");
const { db } = require("./PVAParticipants");

const schema = mongoose.Schema({
  pvaUser: {
    type: mongoose.Schema.Types.ObjectId,
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
  meta : {
      'indexes': [{'fields':{'pvaUser','gameName'},'unique':true}]
  }
});

const model = mongoose.model("result",schema);

module.exports  = model;