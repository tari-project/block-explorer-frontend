import { fetchBlocksData, fetchChainMetadata } from '../../helpers/api';

export const ADD_METADATA = 'ADD_METADATA';
export const ADD_BLOCK = 'ADD_BLOCK';

export const addBlock = (blocks = []) => ({
    type: ADD_BLOCK,
    blocks
});

export const addMetadata = (metadata = {}) => ({
    type: ADD_METADATA,
    metadata
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
