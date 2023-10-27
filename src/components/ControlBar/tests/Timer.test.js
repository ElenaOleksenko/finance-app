import { render, screen } from '@testing-library/react';
import { Timer } from '../components/Timer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const mockedState = {
	stockData: {
		isFetching: false,
		stockData: [],
		watchingGroup: [],
	},
};

test('Timer displays the correct time', async () => {
	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};

	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Timer timeCurr={60000} />
			</BrowserRouter>
		</Provider>
	);
	expect(screen.getByText('01:')).toBeInTheDocument();
});

test('Timer displays 15 seconds when timeCurr is 0', async () => {
	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Timer timeCurr={15000} />
			</BrowserRouter>
		</Provider>
	);
	expect(screen.getByText('15')).toBeInTheDocument();
});
