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

export interface Constants {
    coinbase_lock_height: number;
    blockchain_version: number;
    future_time_limit: number;
    target_block_interval: number;
    difficulty_block_window: number;
    difficulty_max_block_interval: number;
    max_block_transaction_weight: number;
    pow_algo_count: number;
    median_timestamp_count: number;
    emission_initial: number;
    emission_decay: number;
    emission_tail: number;
    min_blake_pow_difficulty: number;
    block_weight_inputs: number;
    block_weight_outputs: number;
    block_weight_kernels: number;
}
export async function fetchConstants(): Promise<Constants> {
    const response = await fetch(`${apiURL}/constants`);
    return await response.json();
}
