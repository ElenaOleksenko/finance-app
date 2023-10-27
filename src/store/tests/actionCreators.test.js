import { setIsFetching, setStockData } from '../stockData/actionCreators';
import stockReducer from '../stockData/reducer';

it('should set isFetching correctly', () => {
	const initialState = { isFetching: false, stockData: [], watchingGroup: [] };
	const newState = stockReducer(initialState, setIsFetching(true));
	expect(newState.isFetching).toBe(true);
});

it('should set stock data correctly', () => {
	const initialState = { isFetching: false, stockData: [], watchingGroup: [] };
	const newData = [];
	const newState = stockReducer(initialState, setStockData(newData));
	expect(newState.stockData).toEqual(newData);
});
