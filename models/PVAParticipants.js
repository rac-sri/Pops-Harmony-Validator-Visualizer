const mongoose = require("mongoose");

const schema = mongoose.Schema({
  emailAddress: String,
  validatorAddress: {
    type: String,
    required: true,
    uniques: true,
  },
  isPops: Boolean,
  identity: String,
  maxChangeRate: [Number],
  maxTotalDelegation: [Number],
  inCommunity: Boolean,
  ActiveDuration: [Number],
  CurrentlyActive: Number,
});

const PVAParticipants = mongoose.model("PVAParticipants", schema);

module.exports = PVAParticipants;
