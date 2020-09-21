const { postUrl } = require("./activeCase");

function createAllPvaUser(pvaList) {
  for (pvauser of pvaList) {
    data = {
      name: pvauser.name,
      validatorAddress: pvauser.address,
      identity: pvauser.identity,
      maxChangeRate: pvauser["max-change-rate"],
      maxTotalDelegation: pvauser["max-total-delegation"],
    };
    postUrl("http://localhost:5000/pvauser", data);
  }
}

function CreateUptimeChallenge(pvaList) {
  for (pvauser of pvaList) {
    data = {
      pvaUser: pvauser.address,
      gameResult: 0,
      gameName: "uptime",
    };
    postUrl("http://localhost:5000/result", data);
  }
}

function CreatenewGameChallenge(pvaList) {
  for (pvauser of pvaList) {
    data = {
      pvaUser: pvauser.address,
      gameResult: 0,
      gameName: "newgame",
    };
    postUrl("http://localhost:5000/result", data);
  }
}

module.exports = {
  CreateUptimeChallenge,
  createAllPvaUser,
  CreatenewGameChallenge,
};
