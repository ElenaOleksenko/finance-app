import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { WatchingGroup } from '../WatchingGroup';

describe('Watching Group component', () => {
	const mockedState = {
		stockData: {
			isFetching: true,
			stockData: [
				{
					ticker: 'AAAA',
					price: '100.00',
				},
				{
					ticker: 'GOOGL',
					price: '120.00',
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

	it('renders Main component correctly', () => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<WatchingGroup />
				</BrowserRouter>
			</Provider>
		);
		expect(screen.getByText('GOOGL')).toBeInTheDocument();
	});
});
