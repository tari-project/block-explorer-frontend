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
