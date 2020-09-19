const axios = require("axios");
const PVA_Participants_List = require("./testdata");

const nodeurl = "http://127.0.0.1:9500";

async function getInformationRpc(rpcEndpoint, method, params) {
  const headers = { "Content-Type": "application/json" };
  const data = { jsonrpc: "2.0", method: method, params: params, id: 1 };

  try {
    console.log("dsfn23nfo93");
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
  console.log(result);
  return result["result"];
}

async function getLatestChainHeadersRPCUrl(rpcurl) {
  const result = getInformationRpc(rpcurl, "hmyv2_getLatestChainHeaders", []);
  console.log(result);
  return result["result"];
}

async function getValidatorInfoRpc(rpcurl) {
  console.log("yoyo");
  const result = await getInformationRpc(
    rpcurl,
    "hmyv2_getAllValidatorInformation",
    [-1]
  );
  console.log(result);
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
  nodeurl = "http://127.0.0.1:9500",
  version = "v6268-v2.3.5"
) {
  const nodeversion = await getNodeMetaDataRPCUrl(nodeurl)["version"];
  if (re.search(version, nodeversion) != None) return True;
  return False;
}

async function checkBLS(validator, nodeurl = "http://127.0.0.1:9500") {
  const nodeinfo = await getNodeMetaDataRPCUrl(nodeurl);
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
}

async function postUrl(url, data) {
  const headers = { "Content-Type": "application/json" };
  const response = await axios({
    url,
    headers,
    data,
  });

  return response;
}

async function putUrl(url, data) {
  const headers = { "Content-Type": "application/json" };

  const result = await axios({
    url,
    data,
    headers,
  });

  return result;
}

async function getPVADetails() {
  const testNetURL = "https://api.s0.b.hmny.io";
  const allValidator = await getValidatorInfoRpc(testNetURL);
  console.log("ok in here", allValidator);
  const pvaValidators = allValidator.filter((value) => {
    return value["validator"]["address"];
  });
  return pvaValidators;
}

async function showPVAdb() {
  const pvausers = await getUrl("http://127.0.0.1:5000/pvausers");
  console.log(pvausers[1]);
  const pvaresults = await getUrl("http://127.0.0.1:5000/results");
}

function createAllPvaUser() {
  for (pvauser in pvaListAddressOnly) {
    data = {
      validatoraddress: pvauser,
      validatorcreated: "False",
      ispops: "False",
      challenges: ["uptime"],
    };
    postUrl("http://127.0.0.1:5000/pvausers", data);
  }
}

function CreateUptimeChallenge() {
  for (pvauser in pvaListAddressOnly) {
    data = {
      pvauser: pvauser,
      gameresult: 0,
      gamename: "uptime",
    };
    post_url("http://127.0.0.1:5000/results", data);
  }
}

async function testUpTime(OnChainPvaValidatorInfo) {
  for (pvauser in PVA_Participants_List) {
    for (onChainPVAUser in OnChainPvaValidatorInfo) {
      if (pvauser.address == onChainPVAUser.validator.address) {
        if (onChainPVAUser["active-status"] == "active") {
          const uptimePoints = await getUrl(
            `http://127.0.0.1:5000/pvausers/add/${pvauser["address"]}/results/uptime`
          );

          if (uptimePoints.length == 0) {
            postUrl(
              `http://127.0.0.1:5000/pvausers/add/${pvauser["address"]}/results/uptime`,
              { gameresult: 1 }
            );
          } else {
            const newPoints = int(uptimePoints[0]["gameresult"]) + 1;
            data = { gameresult: newpoints };

            putUrl(
              `http://127.0.0.1:5000/pvausers/add/${pvauser["address"]}/results/uptime`,
              data
            );
            print(`updated uptime for ${pvauser["address"]} with ${data}`);
          }
        }
      }
    }
  }
}

async function init() {
  //pvavalidators = await getPVADetails();
  createAllPvaUser();
  showPVAdb();
}

init();
