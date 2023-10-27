import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Main } from '../Main';

describe('Main component', () => {
	const mockedState = {
		stockData: {
			isFetching: true,
			stockData: [
				{
					ticker: 'GGGG',
					price: '100.00',
				},
				{
					ticker: 'GOOGL',
					price: '120.00',
				},
			],
			watchingGroup: [],
		},
	};
	const watch_group = [
		{
			ticker: 'GOOGL',
			price: '120.00',
		},
	];

	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};

	it('renders Main component correctly', () => {
		localStorage.setItem('watch_group', JSON.stringify(watch_group));
		JSON.parse(localStorage.getItem('watch_group'));

		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<Main />
				</BrowserRouter>
			</Provider>
		);
		expect(screen.getByText('GGGG')).toBeInTheDocument();
	});
});
