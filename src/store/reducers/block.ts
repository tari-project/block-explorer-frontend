import { ADD_SINGLE_BLOCK } from '../actions';
import { BlocksEntity } from '../../types/Blocks';

export const block = (state: BlocksEntity[] = [], action) => {
    switch (action.type) {
        case ADD_SINGLE_BLOCK:
            return { ...state, ...action.block };
        default:
            return state;
    }
};
