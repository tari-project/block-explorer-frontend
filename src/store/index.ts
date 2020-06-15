import { createStore, applyMiddleware } from 'redux';
import config from '../config';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';
import {fetchBlocks, fetchDifficulties, fetchMetadata, fetchConstant} from './actions';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
store.dispatch(fetchBlocks(config.initialBlockCount));
store.dispatch(fetchMetadata());
store.dispatch(fetchDifficulties());
store.dispatch(fetchConstant());
export default store;
