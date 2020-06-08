import { createStore, applyMiddleware } from 'redux';
import config from '../config';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';
import { fetchBlocks } from './actions';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
store.dispatch(fetchBlocks(config.initialBlockCount));
export default store;
