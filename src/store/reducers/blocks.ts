import { ADD_BLOCK } from '../actions';
import { BlocksEntity } from '../../types/Blocks';

export const blocks = (state: BlocksEntity[] = [], action) => {
    switch (action.type) {
        case ADD_BLOCK:
            return [...state, ...action.blocks];
        default:
            return state;
    }
};
