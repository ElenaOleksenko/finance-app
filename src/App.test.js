import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import App from './App';
import { Provider } from 'react-redux';
const mockedState = {
	stockData: {
		isFetching: true,
		stockData: [
			{
				ticker: 'AAPL',
				yield: '2.5',
				exchange: 'NASDAQ',
				price: '150.0',
				change: '5.0',
				change_percent: '4%',
				dividend: '1.5',
				last_trade_time: '2023-10-26T10:00:00Z',
			},
		],
		watchingGroup: [
			{
				ticker: 'GOOGL',
				price: '120.00',
			},
		],
	},
};
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

test('renders Main component for the default route', () => {
	render(
		<Provider store={mockedStore}>
			<MemoryRouter initialEntries={['/']}>
				<App />
			</MemoryRouter>
		</Provider>
	);

	expect(screen.getByText(/Watching Group/i)).toBeInTheDocument();
});

test('renders WatchingGroup component for the /watching_group route', () => {
	render(
		<Provider store={mockedStore}>
			<MemoryRouter initialEntries={['/watching_group']}>
				<App />
			</MemoryRouter>
		</Provider>
	);

	expect(screen.getByText(/GO Back/i)).toBeInTheDocument();
});

test('renders NotFound component for unknown routes', () => {
	render(
		<MemoryRouter initialEntries={['/unknown']}>
			<App />
		</MemoryRouter>
	);

	expect(
		screen.getByText(/Sorry, this page doesn't exist/i)
	).toBeInTheDocument();
});
