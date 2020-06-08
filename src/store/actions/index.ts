import { fetchBlocksData } from '../../helpers/api';

export const ADD_BLOCK = 'ADD_BLOCK';

export const addBlock = (blocks = []) => ({
    type: ADD_BLOCK,
    blocks
});

export function fetchBlocks(limit: number) {
    return function (dispatch) {
        fetchBlocksData(limit).then((blocks) => {
            dispatch(addBlock(blocks.blocks as any));
        });
    };
}
