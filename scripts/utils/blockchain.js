const axios = require("axios");

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
  const result = await getInformationRpc(
    rpcurl,
    "hmyv2_getAllValidatorInformation",
    [validator]
  );
  return result["result"];
}

async function getAllValidatorInfoRpc(rpcurl) {
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

async function getPVADetails() {
  const testNetURL = "https://api.s0.b.hmny.io";
  const allValidator = await getAllValidatorInfoRpc(testNetURL);
  const pvaValidators = allValidator.filter((value) => {
    return value["validator"]["address"];
  });
  return pvaValidators;
}

module.exports = {
  getPVADetails,
  getNodeNetwork,
  getAllValidatorInfoRpc,
  getValidatorInfoRpc,
  getLatestChainHeadersRPCUrl,
  getNodeMetaDataRPCUrl,
  getInformationRpc,
};
