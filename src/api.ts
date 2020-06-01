const apiURL: string = process.env.REACT_APP_EXPLORER_API_URL || "";

interface ChainMetadata {
  blockHeight: number;
  totalTransactions: number;
}

export async function fetchChainMetadata(): Promise<ChainMetadata> {
  const response = await fetch(`${apiURL}/chain-metadata`);
  return await response.json();
}
