import {
	setAddWatchingGroup,
	setDeleteWatchingGroup,
	setIsFetching,
	setStockData,
	setWatchingGroup,
} from '../stockData/actionCreators';
import stockReducer from '../stockData/reducer';
import { cleanup } from '@testing-library/react';

describe('stockReducer', () => {
	afterEach(() => {
		cleanup();
	});

	it('should return the initial state', () => {
		const initialState = {
			isFetching: true,
			stockData: [],
			watchingGroup: [],
		};
		const result = stockReducer(undefined, {});
		expect(result).toEqual(initialState);
	});

	it('should set isFetching to the provided value', () => {
		const initialState = {
			isFetching: false,
			stockData: [],
			watchingGroup: [],
		};

		const newState = stockReducer(initialState, setIsFetching(true));

		expect(newState.isFetching).toBe(true);
	});

	it('should set stockData to the provided value', () => {
		const initialState = {
			isFetching: true,
			stockData: [],
			watchingGroup: [],
		};

		const newData = [{ ticker: 'AAPL', price: '150.0' }];
		const newState = stockReducer(initialState, setStockData(newData));

		expect(newState.stockData).toEqual(newData);
	});

	it('should set watchingGroup to the provided value', () => {
		const initialState = {
			isFetching: true,
			stockData: [],
			watchingGroup: [],
		};

		const newWatchingGroup = [{ ticker: 'AAPL', price: '150.0' }];
		const newState = stockReducer(
			initialState,
			setWatchingGroup(newWatchingGroup)
		);

		expect(newState.watchingGroup).toEqual(newWatchingGroup);
	});

	it('should add a new item to watchingGroup', () => {
		const initialState = {
			isFetching: true,
			stockData: [],
			watchingGroup: [{ ticker: 'AAPL', price: '150.0' }],
		};

		const newItem = { ticker: 'GOOGL', price: '170.0' };
		const newState = stockReducer(initialState, setAddWatchingGroup(newItem));

		expect(newState.watchingGroup).toEqual([
			{ ticker: 'AAPL', price: '150.0' },
			{ ticker: 'GOOGL', price: '170.0' },
		]);
	});

	it('should remove the item with the provided ticker from watchingGroup', () => {
		const initialState = {
			isFetching: true,
			stockData: [],
			watchingGroup: [
				{ ticker: 'AAPL', price: '150.0' },
				{ ticker: 'GOOGL', price: '170.0' },
			],
		};

		const deletedTicker = 'AAPL';
		const newState = stockReducer(
			initialState,
			setDeleteWatchingGroup(deletedTicker)
		);

		expect(newState.watchingGroup).toEqual([
			{ ticker: 'GOOGL', price: '170.0' },
		]);
	});
});
