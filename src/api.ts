const apiURL: string = process.env.REACT_APP_EXPLORER_API_URL || "";

interface ChainMetadata {
  blockHeight: number;
  totalTransactions: number;
  averageFee: number;
  averageDifficulty: {
    estimatedHashRate: number
  };
  avgBlockTimes: number;
}

export async function fetchChainMetadata(): Promise<ChainMetadata> {
  const response = await fetch(`${apiURL}/chain-metadata`);
  return await response.json();
}

interface BlocksData {
    blocks: any[];
}

export async function fetchBlocksData(): Promise<BlocksData> {
    const response = await fetch(`${apiURL}/blocks`);
    return await response.json();
}

interface TokensInCirculation {
    height: number;
    totalTokensInCirculation: number;

    map(param: (token) => void): void;
}

export async function fetchTokensInCirculation(): Promise<TokensInCirculation> {
    const response = await fetch(`${apiURL}/tokens-in-circulation?from_tip=21600&step=720`);
    return await response.json();
}

interface NetworkDifficultyEstimatedHash {
  estimated_hash_rate: number;
  height: number;
}

interface NetworkDifficultyEstimatedHashes extends Array<NetworkDifficultyEstimatedHash>{}

export async function fetchNetworkDifficulty(): Promise<NetworkDifficultyEstimatedHashes> {
  const response = await fetch(`${apiURL}/network-difficulty`);
  return await response.json();
}
