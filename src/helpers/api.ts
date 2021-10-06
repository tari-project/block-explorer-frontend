import config from '../config';
import { addBlock, addConstant, addMetadata } from '../store/actions';
import { Blocks, BlocksEntity } from '../types/Blocks';
import { TokensInCirculation } from '../types/Data';

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

async function fetchApi<T>(uri: string): Promise<T> {
    const response = await fetch(`${apiUrl}${uri}`);
    const json = await response.json();
    if (!response.ok) {
        throw json;
    }
    return json;
}

export async function fetchChainMetadata(): Promise<ChainMetadata> {
    return await fetchApi(`/chain-metadata`);
}

export async function fetchBlocksData(limit = 30, sort = 'desc', page = 0): Promise<Blocks> {
    const blocks = await fetchApi<Blocks>(`/blocks?limit=${limit}&sort=${sort}&page=${page}`);
    if (sort === 'desc') {
        blocks.blocks.sort((a, b) => b.block.header.height - a.block.header.height);
    }
    return blocks;
}

export async function fetchTokensInCirculation(fromTip = 20160, step = 360): Promise<TokensInCirculation> {
    return await fetchApi(`/tokens-in-circulation?from_tip=${fromTip}&step=${step}`);
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
    return await fetchApi(`/network-difficulty`);
}

export async function fetchSingleBlock(blockId: string | number): Promise<BlocksEntity> {
    return await fetchApi(`/blocks/${blockId}`);
}

export async function searchKernel(publicNonce: string, signature: string): Promise<Blocks> {
    return await fetchApi(`/kernel/${publicNonce}/${signature}`);
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
    return await fetchApi(`/constants`);
}
