import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { StockComponent } from '../StockComponent';
import { BrowserRouter } from 'react-router-dom';
import { setDeleteWatchingGroup } from '../../../store/stockData/actionCreators';
import { cleanup } from '@testing-library/react';

const mockData = {
	ticker: 'AAPL',
	yield: '2.5',
	exchange: 'NASDAQ',
	price: '150.0',
	change: '5.0',
	change_percent: '4%',
	dividend: '1.5',
	last_trade_time: '2023-10-26T10:00:00Z',
};

const mockedState = {
	isFetching: true,
	stockData: {
		stockData: [],
	},
	watchingGroup: [],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

describe('StockComponent', () => {
	afterEach(() => {
		cleanup();
	});
	it('renders StockComponent correctly', () => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<StockComponent data={mockData} />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByText(mockData.ticker)).toBeInTheDocument();
		expect(screen.getByText(mockData.yield)).toBeInTheDocument();
	});

	it('adds from watching group on button click', async () => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<StockComponent data={mockData} />
				</BrowserRouter>
			</Provider>
		);
		expect(screen.getByTestId('add-icon')).toBeInTheDocument();
		fireEvent.click(screen.getByTestId('add-icon'));

		await waitFor(() => {
			expect(screen.queryByTestId('add-icon')).toBeNull();
		});
	});
	it('remove from watching group on button click', async () => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<StockComponent data={mockData} />
				</BrowserRouter>
			</Provider>
		);
		expect(screen.getByTestId('remove-icon')).toBeInTheDocument();

		fireEvent.click(screen.getByTestId('remove-icon'));

		expect(mockedStore.dispatch).toHaveBeenCalledWith(
			setDeleteWatchingGroup(mockData.ticker)
		);
	});
});
