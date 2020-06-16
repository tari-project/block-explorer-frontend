import { combineReducers } from 'redux';
import { blocks } from './blocks';
import { metadata } from './metadata';
import { difficulties } from './difficulties';
import { block } from './block';
import { constants } from './constants';

export default combineReducers({
    blocks,
    metadata,
    difficulties,
    block,
    constants
});
