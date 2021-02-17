import config from '../config';
import { addBlock, addConstant, addMetadata } from '../store/actions';
import { Blocks, BlocksEntity } from '../types/Blocks';

const { apiUrl, wsUrl } = config;
export interface ChainMetadata {
    blockHeight: number;
    totalTransactions: number;
    averageFee: number;
    averageDifficulty: {
        estimatedHashRate: number;
    };
    averageBlockTimes: number;
    averageTxPerSecond: number;
}

export async function fetchChainMetadata(): Promise<ChainMetadata> {
    const response = await fetch(`${apiUrl}/chain-metadata`);
    return await response.json();
}

export async function fetchBlocksData(limit = 30, sort = 'desc', page = 0): Promise<Blocks> {
    const response = await fetch(`${apiUrl}/blocks?limit=${limit}&sort=${sort}&page=${page}`);
    const blocks = await response.json();
    if (sort === 'desc') {
        blocks.blocks.sort((a, b) => b.block.header.height - a.block.header.height);
    }
    return blocks;
}

interface TokensInCirculation {
    height: number;
    totalTokensInCirculation: number;

    map(param: (token) => void): void;
}

export async function fetchTokensInCirculation(fromTip = 20160, step = 360): Promise<TokensInCirculation> {
    const response = await fetch(`${apiUrl}/tokens-in-circulation?from_tip=${fromTip}&step=${step}`);
    const tokens = await response.json();
    return tokens;
}

export function setupWebsockets(store) {
    const ws = new WebSocket(wsUrl);
    ws.onmessage = function (event) {
        const msg: any = JSON.parse(event.data);
        switch (msg.type) {
            case 'newBlock':
                store.dispatch(addBlock([msg.data] as BlocksEntity[]));
                break;
            case 'metadata':
                store.dispatch(addMetadata(msg.data as ChainMetadata));
                break;
            case 'constants':
                store.dispatch(addConstant(msg.data as Constants));
                break;
        }
    };
    ws.onclose = function (e) {
        setTimeout(() => {
            setupWebsockets(store);
        }, 5000);
    };
    ws.onerror = function (e) {
        console.log('WebSocket error', e);
    };
    return ws;
}

export interface NetworkDifficultyEstimatedHash {
    difficulty: number;
    estimated_hash_rate: number;
    height: number;
    timestamp: number;
    pow_algo: number;
}

export type NetworkDifficultyEstimatedHashes = Array<NetworkDifficultyEstimatedHash>;

export async function fetchNetworkDifficulty(): Promise<NetworkDifficultyEstimatedHashes> {
    const response = await fetch(`${apiUrl}/network-difficulty`);
    return await response.json();
}

export async function fetchSingleBlock(blockId: string | number): Promise<BlocksEntity> {
    try {
        const response = await fetch(`${apiUrl}/blocks/${blockId}`);
        return await response.json();
    } catch (e) {
        return e;
    }
}

export async function searchKernel(publicNonce: string, signature: string): Promise<Blocks> {
    try {
        const response = await fetch(`${apiUrl}/kernel/${publicNonce}/${signature}`);
        return await response.json();
    } catch (e) {
        return e;
    }
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

export async function fetchConstantsData(): Promise<Constants> {
    const response = await fetch(`${apiUrl}/constants`);
    return await response.json();
}
