import { legacy_createStore as createStore } from 'redux';
import { combineReducers } from 'redux';
import stockReducer from './stockData/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
	stockData: stockReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());

export default rootReducer;
