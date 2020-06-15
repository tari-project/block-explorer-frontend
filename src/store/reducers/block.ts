import { ADD_SINGLE_BLOCK } from '../actions';

export const block = (state = {}, action) => {
    switch (action.type) {
        case ADD_SINGLE_BLOCK:
            return { ...state, ...action.block };
        default:
            return state;
    }
};