import config from '../config';
import { addBlock } from '../store/actions';

const { apiUrl, wsUrl } = config;
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
        store.dispatch(addBlock([msg.data] as any));
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
