import {
    fetchBlocksData,
    fetchChainMetadata,
    fetchNetworkDifficulty,
    NetworkDifficultyEstimatedHashes,
    fetchSingleBlock,
    SingleBlockData, Constants,
    fetchConstants
} from '../../helpers/api';
import { Blocks, BlocksEntity } from '../../helpers/Blocks';

export const ADD_METADATA = 'ADD_METADATA';
export const ADD_BLOCK = 'ADD_BLOCK';
export const ADD_DIFFICULTY = 'ADD_DIFFICULTY';
export const ADD_SINGLE_BLOCK = 'ADD_SINGLE_BLOCK';
export const ADD_CONSTANT = 'ADD_CONSTANT';

export const addBlock = (blocks: BlocksEntity[] = []) => ({
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

export const addSingleBlock = (block: SingleBlockData) => ({
    type: ADD_SINGLE_BLOCK,
    block
});

export const addConstant = (constant: Constants) => ({
    type: ADD_CONSTANT,
    constant
});

export function fetchBlocks(limit: number) {
    return function (dispatch) {
        fetchBlocksData(limit).then((blocks: Blocks) => {
            dispatch(addBlock(blocks.blocks));
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

export function fetchBlock(blockId?) {
    return function (dispatch) {
        fetchSingleBlock(blockId).then((block) => {
            dispatch(addSingleBlock(block as any));
        });
    };
}

export function fetchConstant() {
    return function (dispatch) {
        fetchConstants().then((constant: Constants) => {
            dispatch(addConstant(constant as Constants));
        });
    };
}
