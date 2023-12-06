import { ADD_BLOCK } from '../actions';
import { BlocksEntity } from '../../types/Blocks';
import config from '../../config';

export const blocks = (state: BlocksEntity[] = [], action) => {
    switch (action.type) {
        case ADD_BLOCK:
            return [...state.slice(0, config.initialBlockCount), ...action.blocks];
        default:
            return state;
    }
};
