import { ADD_BLOCK } from '../actions';

export const blocks = (state = [], action) => {
    switch (action.type) {
        case ADD_BLOCK:
            return [...state, ...action.blocks];
        default:
            return state;
    }
};
