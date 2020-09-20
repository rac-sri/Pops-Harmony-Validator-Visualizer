const axios = require("axios");
const PVA_Participants_List = require("./testdata");

const nodeurl = "http://localhost:9500";

async function getInformationRpc(rpcEndpoint, method, params) {
  const headers = { "Content-Type": "application/json" };
  const data = { jsonrpc: "2.0", method: method, params: params, id: 1 };
  try {
    const result = await axios({
      method: "post",
      url: rpcEndpoint,
      headers,
      data,
    });
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

async function getNodeMetaDataRPCUrl(rpcurl) {
  const result = getInformationRpc(rpcurl, "hmyv2_getNodeMetadata", []);
  return result["result"];
}

async function getLatestChainHeadersRPCUrl(rpcurl) {
  const result = getInformationRpc(rpcurl, "hmyv2_getLatestChainHeaders", []);
  console.log(result);
  return result["result"];
}

async function getValidatorInfoRpc(validator, rpcurl) {
  console.log("yoyo");
  const result = await getInformationRpc(
    rpcurl,
    "hmyv2_getAllValidatorInformation",
    [validator]
  );
  return result["result"];
}

async function getAllValidatorInfoRpc(rpcurl) {
  console.log("yoyo");
  const result = await getInformationRpc(
    rpcurl,
    "hmyv2_getAllValidatorInformation",
    [-1]
  );

  return result["result"];
}

async function getNodeNetwork(nodeurl) {
  const nodeInfo = getNodeMetaDataRPCUrl(nodeurl);
  const endpoint = "";

  if (nodeInfo["network"] == "mainnet") {
    endpoint = "https://api.s0.t.hmny.io";
  }
  if (nodeinfo["network"] == "testnet") endpoint = "https://api.s0.b.hmny.io";

  const data = { network: nodeinfo["network"], endpoint };
  return data;
}

async function IsInSynced() {
  const nodeinfo = await getNodeMetaDataRPCUrl(nodeurl);
  const shardid = nodeinfo["shard-id"];
  const network = nodeinfo["network"];
  const endpoint = "";

  if (network == "mainnet") endpoint = "https://api.s{shardid}.t.hmny.io";
  if (network == "testnet") endpoint = "https://api.s{shardid}.b.hmny.io";

  const latestHeaders = getLatestChainHeadersRPCUrl(nodeurl);
  nodeBcShardBlockHeigth = latestHeaders["beacon-chain-header"]["block-number"];
  nodeNonBcShardBlockHeigth =
    latestHeaders["shared-chain-header"]["block-number"];

  const networkLatestHeader = getLatestChainHeadersRPCUrl(endpoint);
  networkBcShardBlockHeigth =
    networkLatestHeader["beacon-chain-header"]["block-number"];
  networkNonBcShardBlockHeigth =
    networkLatestHeader["shared-chain-header"]["block-number"];

  const bcDiff = Math.abs(
    node_bc_shard_block_height - network_bc_shard_block_height
  );
  const nonBcDiff = Math.abs(
    node_non_bc_shard_block_height - network_non_bc_shard_block_height
  );

  bc_sync_status = bcDiff < 100 ? true : false;
  non_bc_sync_status = nonBcDiff < 100 ? true : false;

  if (bc_sync_status && non_bc_sync_status) return true;
  else return false;
}

async function CheckVersion(
  nodeurl = "http://localhost:9500",
  version = "v6268-v2.3.5"
) {
  const nodeversion = await getNodeMetaDataRPCUrl(nodeurl)["version"];
  if (re.search(version, nodeversion) != None) return True;
  return False;
}

async function checkBLS(validator, nodeurl = "http://localhost:9500") {
  const nodeinfo = await getNodeMetaDataRPCUrl(nodeurl);
  console.log(nodeinfo);
  const shardid = nodeinfo["shard-id"];
  const network = nodeinfo["network"];
  const endpoint = "";
  const s0endpoint = "";

  if (network == "mainnet") {
    endpoint = "https://api.s{shardid}.t.hmny.io";
    s0endpoint = "https://api.s0.t.hmny.io";
  }
  if (network == "testnet") {
    endpoint = "https://api.s{shardid}.b.hmny.io";
    s0endpoint = "https://api.s0.b.hmny.io";
  }

  const validatorinfo = await getValidatorInfoRpc(validator, s0endpoint);
  const configureNetworkBls = validatorinfo["validator"]["bls-public-keys"];
  const node_bls = nodeinfo["blskey"];

  for (keyChain in configureNetworkBls) {
    const keyfound = false;

    for (keyNode in node_bls) {
      if (keyChain == keyNode) {
        keyfound = true;
        continue;
      }
    }
    if (keyfound == false) {
      return false;
    }
  }
  return true;
}

const pvaListAddressOnly = PVA_Participants_List.map((value) => {
  return value.address;
});

async function getUrl(url) {
  const response = await axios.get(url);
  return response;
}

async function postUrl(url, data) {
  const headers = { "Content-Type": "application/json" };
  const response = await axios({
    url,
    headers,
    data,
    method: "post",
  });
  console.log(response);
}

async function putUrl(url, data) {
  const headers = { "Content-Type": "application/json" };

  const result = await axios({
    url,
    data,
    headers,
    method: "put",
  });

  return result;
}

async function getPVADetails() {
  const testNetURL = "https://api.s0.b.hmny.io";
  const allValidator = await getAllValidatorInfoRpc(testNetURL);
  const pvaValidators = allValidator.filter((value) => {
    return value["validator"]["address"];
  });
  return pvaValidators;
}

async function showPVAdb() {
  const pvausers = await getUrl("http://localhost:5000/pvauser");
  console.log(pvausers);
  const pvaresults = await getUrl("http://localhost:5000/results");
}

function createAllPvaUser() {
  for (pvauser of pvaListAddressOnly) {
    data = {
      validatorAddress: pvauser,
      validatorCreated: "False",
      isPops: false,
    };
    postUrl("http://localhost:5000/pvauser", data);
  }
}

function CreateUptimeChallenge() {
  for (pvauser of pvaListAddressOnly) {
    data = {
      pvaUser: pvauser,
      gameResult: 0,
      gameName: "uptime",
    };
    postUrl("http://localhost:5000/result", data);
  }
}

async function testUpTime(OnChainPvaValidatorInfo) {
  for (pvauser of PVA_Participants_List) {
    for (onChainPVAUser of OnChainPvaValidatorInfo) {
      if (pvauser.address == onChainPVAUser.validator.address) {
        if (onChainPVAUser["active-status"] == "active") {
          const uptimePoints = await getUrl(
            `http://localhost:5000/result/add/${pvauser["address"]}/results/uptime`
          );

          const newPoints = parseInt(uptimePoints.data["gameResult"]) + 1;
          data = { gameResult: newPoints };

          const update = await putUrl(
            `http://localhost:5000/result/add/${pvauser["address"]}/results/uptime`,
            data
          );
          console.log(
            `updated uptime for ${pvauser["address"]} with ${data}`,
            update.data
          );
        }
      }
    }
  }
}

const fs = require("fs");

async function init() {
  const pvavalidators = await getPVADetails();
  console.log(pvavalidators);
  // fs.writeFileSync("validatosChain.json", JSIN.stringyfy(pvavalidators), "utf-8");

  //const validatorChain = require("./validatosChain.json");
  // // console.log(validatorChain[0].validator.address);
  //testUpTime(validatorChain);

  // createAllPvaUser();
  // CreateUptimeChallenge();
  // console.log(process.argv);
  // const validator = process.argv[2];
  // const nodeurl = process.argv[3];

  // args :
  // version
  // node
  // validator
}

init();
