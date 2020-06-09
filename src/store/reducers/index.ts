import { combineReducers } from 'redux';
import { blocks } from './blocks';
import { metadata } from './metadata';
import { difficulties } from './difficulties';

export default combineReducers({
    blocks,
    metadata,
    difficulties
});
