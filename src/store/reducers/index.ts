import { combineReducers } from 'redux';
import { blocks } from './blocks';
import { metadata } from './metadata';

export default combineReducers({
    blocks,
    metadata
});
