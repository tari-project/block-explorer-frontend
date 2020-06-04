const apiURL: string = process.env.REACT_APP_EXPLORER_API_URL || '';

interface ChainMetadata {
    blockHeight: number;
    totalTransactions: number;
    averageFee: number;
    averageDifficulty: {
        estimatedHashRate: number;
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

export async function fetchBlocksData(limit = 30, sort = 'desc', page = 0): Promise<BlocksData> {
    const response = await fetch(`${apiURL}/blocks?limit=${limit}&sort=${sort}&page=${page}`);
    const blocks = await response.json();
    if (sort === 'desc') {
        blocks.blocks.sort((a, b) => b.block.header.height - a.block.header.height);
    }
    blocks.blocks.forEach((block, i) => {
        let nextTimestamp = block.block.header.timestamp.seconds;
        if (blocks.blocks.length > i + 1) {
            const next = blocks.blocks[i + 1];
            nextTimestamp = next.block.header.timestamp.seconds;
        }
        block.block._miningTime = block.block.header.timestamp.seconds - nextTimestamp;
    });
    return blocks;
}

interface TokensInCirculation {
    height: number;
    totalTokensInCirculation: number;

    map(param: (token) => void): void;
}

export async function fetchTokensInCirculation(fromTip = 20160, step = 360): Promise<TokensInCirculation> {
    const response = await fetch(`${apiURL}/tokens-in-circulation?from_tip=${fromTip}&step=${step}`);
    const tokens = await response.json();
    return tokens;
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
