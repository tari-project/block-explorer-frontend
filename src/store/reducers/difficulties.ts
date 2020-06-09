import { ADD_DIFFICULTY } from '../actions';
import { NetworkDifficultyEstimatedHashes } from '../../helpers/api';

export const difficulties = (state: NetworkDifficultyEstimatedHashes = [], action) => {
    switch (action.type) {
        case ADD_DIFFICULTY:
            return [...state, ...action.difficulties];
        default:
            return state;
    }
};
