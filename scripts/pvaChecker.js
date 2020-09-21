const axios = require("axios");
const fs = require("fs");
const { active, getUrl, postUrl, putUrl } = require("./utils/activeCase");
const { createAllPvaUser, CreateUptimeChallenge } = require("./utils/create");
const {
  getPVADetails,
  getNodeNetwork,
  getAllValidatorInfoRpc,
  getValidatorInfoRpc,
  getLatestChainHeadersRPCUrl,
  getNodeMetaDataRPCUrl,
  getInformationRpc,
} = require("./utils/blockchain");

async function CheckVersion(
  nodeurl = "http://localhost:9500",
  version = "v6268-v2.3.5"
) {
  const nodeversion = await getNodeMetaDataRPCUrl(nodeurl)["version"];
  if (re.search(version, nodeversion) != None) return True;
  return False;
}

async function showPVAdb() {
  const pvausers = await getUrl("http://localhost:5000/pvauser");
  console.log(pvausers);
  const pvaresults = await getUrl("http://localhost:5000/results");
}

async function testUpTime(OnChainPvaValidatorInfo) {
  for (pvauser of PVA_Participants_List) {
    for (onChainPVAUser of OnChainPvaValidatorInfo) {
      if (pvauser.address == onChainPVAUser.validator.address) {
        if (onChainPVAUser["active-status"] == "active") {
          active();
        }
      }
    }
  }
}

async function init() {
  const validatorChain = require("./validatosChain.json");
  await createAllPvaUser(validatorChain);
  await CreateUptimeChallenge(validatorChain);

  //  const getPva = await getPVADetails();
  // testUpTime(validatorChain, get);
  // console.log(process.argv);
  // const validator = process.argv[2];
  // const nodeurl = process.argv[3];

  // args :
  // version
  // node
  // validator
}

init();
