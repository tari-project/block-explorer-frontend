import { ADD_CONSTANT } from '../actions';

export const constants = (state = {}, action) => {
    switch (action.type) {
        case ADD_CONSTANT:
            return { ...state, ...action.constants };
        default:
            return state;
    }
};
