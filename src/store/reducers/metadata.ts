import { ADD_METADATA } from '../actions';

export const metadata = (state = {}, action) => {
    switch (action.type) {
        case ADD_METADATA:
            return { ...state, ...action.metadata };
        default:
            return state;
    }
};
