const mongoose = require("mongoose");

const schema = mongoose.Schema({
  emailAddress: String,
  validatorAddress: {
    type: String,
    required: true,
    uniques: true,
  },
});

const PVAParticipants = mongoose.model("PVAParticipants", schema);

module.exports = PVAParticipants;
