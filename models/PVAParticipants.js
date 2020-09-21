const mongoose = require("mongoose");

const schema = mongoose.Schema({
  emailAddress: String,
  validatorAddress: {
    type: String,
    required: true,
    uniques: true,
  },
  identity: String,
  maxChangeRate: Number,
  maxTotalDelegation: Number,
  ActiveDuration: [Number],
  CurrentlyActive: Number,
  games: [
    {
      type: mongoose.Types.ObjectId,
      ref: "results",
    },
  ],
});

const PVAParticipants = mongoose.model("pvaparticipants", schema);

module.exports = PVAParticipants;
