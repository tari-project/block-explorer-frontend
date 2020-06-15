import config from '../config';
import { addBlock, addMetadata } from '../store/actions';

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

interface BlocksData {
    blocks: any[];
}

export async function fetchBlocksData(limit = 30, sort = 'desc', page = 0): Promise<BlocksData> {
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
                store.dispatch(addBlock([msg.data] as any));
                break;
            case 'metadata':
                store.dispatch(addMetadata(msg.data as any));
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
    estimated_hash_rate: number;
    height: number;
}

export type NetworkDifficultyEstimatedHashes = Array<NetworkDifficultyEstimatedHash>;

export async function fetchNetworkDifficulty(): Promise<NetworkDifficultyEstimatedHashes> {
    const response = await fetch(`${apiUrl}/network-difficulty`);
    return await response.json();
}

export interface SingleBlockData {
    block: any;
}

export async function fetchSingleBlock(blockId: string|number): Promise<SingleBlockData> {
    try {
        const response = await fetch(`${apiUrl}/block/${blockId}`);
        return await response.json()
    }catch(e) {
        return e;
    }
}

export interface Constants {
    max_block_transaction_weight: number;
}

export async function fetchConstants(): Promise<Constants> {
    const response = await fetch(`${apiUrl}/constants`);
    return await response.json();
}

