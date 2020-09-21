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
