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
