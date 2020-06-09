import {
    fetchBlocksData,
    fetchChainMetadata,
    fetchNetworkDifficulty,
    NetworkDifficultyEstimatedHashes
} from '../../helpers/api';

export const ADD_METADATA = 'ADD_METADATA';
export const ADD_BLOCK = 'ADD_BLOCK';
export const ADD_DIFFICULTY = 'ADD_DIFFICULTY';

export const addBlock = (blocks = []) => ({
    type: ADD_BLOCK,
    blocks
});

export const addMetadata = (metadata = {}) => ({
    type: ADD_METADATA,
    metadata
});

export const addDifficulty = (difficulties: NetworkDifficultyEstimatedHashes = []) => ({
    type: ADD_DIFFICULTY,
    difficulties
});

export function fetchBlocks(limit: number) {
    return function (dispatch) {
        fetchBlocksData(limit).then((blocks) => {
            dispatch(addBlock(blocks.blocks as any));
        });
    };
}

export function fetchMetadata() {
    return function (dispatch) {
        fetchChainMetadata().then((metadata) => {
            dispatch(addMetadata(metadata));
        });
    };
}

export function fetchDifficulties() {
    return function (dispatch) {
        fetchNetworkDifficulty().then((difficulties: NetworkDifficultyEstimatedHashes) => {
            dispatch(addDifficulty(difficulties));
        });
    };
}
