import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ControlBar } from '../ControlBar';
import { setIsFetching } from '../../../store/stockData/actionCreators';

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
const watch_group = [
	{
		ticker: 'GOOGL',
		price: '120.00',
	},
];
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate,
}));

describe('ControlBar component', () => {
	it('renders ControlBar component correctly', () => {
		localStorage.setItem('watch_group', JSON.stringify(watch_group));
		JSON.parse(localStorage.getItem('watch_group'));
		act(() => {
			render(
				<Provider store={mockedStore}>
					<BrowserRouter>
						<ControlBar />
					</BrowserRouter>
				</Provider>
			);
		});
		expect(screen.getByText('Watching Group')).toBeInTheDocument();
	});

	it('calls setIsFetching with false on stopFetching', () => {
		act(() => {
			render(
				<Provider store={mockedStore}>
					<BrowserRouter>
						<ControlBar />
					</BrowserRouter>
				</Provider>
			);
		});

		act(() => {
			fireEvent.click(screen.getByTestId('stop-button'));
		});
		expect(mockedStore.dispatch).toHaveBeenCalledWith(setIsFetching(false));
	});
});

it('calls setIsFetching with false on startFetching', () => {
	act(() => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<ControlBar />
				</BrowserRouter>
			</Provider>
		);
	});
	act(() => {
		fireEvent.click(screen.getByTestId('start-button'));
	});

	expect(mockedStore.dispatch).toHaveBeenCalledWith(setIsFetching(true));
});

it('calls setIsFetching with false and then true after 5s', () => {
	jest.useFakeTimers();
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<ControlBar />
			</BrowserRouter>
		</Provider>
	);
	act(() => {
		fireEvent.click(screen.getByText('Timer'));
	});
	act(() => {
		fireEvent.click(screen.getByText('5S'));
	});
	expect(mockedStore.dispatch).toHaveBeenCalledWith(setIsFetching(false));
	act(() => {
		jest.advanceTimersByTime(5000);
	});
	expect(mockedStore.dispatch).toHaveBeenCalledWith(setIsFetching(true));
});

it('calls setIsFetching with false and then true after 15s', () => {
	jest.useFakeTimers();
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<ControlBar />
			</BrowserRouter>
		</Provider>
	);
	act(() => {
		fireEvent.click(screen.getByText('Timer'));
	});
	expect(screen.getByText('15S')).toBeInTheDocument();
	act(() => {
		fireEvent.click(screen.getByText('15S'));
	});

	expect(mockedStore.dispatch).toHaveBeenCalledWith(setIsFetching(false));
	act(() => {
		jest.advanceTimersByTime(15000);
	});
	expect(mockedStore.dispatch).toHaveBeenCalledWith(setIsFetching(true));
});

it('calls setIsFetching with false and then true after 30s', () => {
	jest.useFakeTimers();
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<ControlBar />
			</BrowserRouter>
		</Provider>
	);
	act(() => {
		fireEvent.click(screen.getByText('Timer'));
	});
	act(() => {
		fireEvent.click(screen.getByText('30S'));
	});
	expect(mockedStore.dispatch).toHaveBeenCalledWith(setIsFetching(false));
	act(() => {
		jest.advanceTimersByTime(30000);
	});
	expect(mockedStore.dispatch).toHaveBeenCalledWith(setIsFetching(true));
});

it('calls setIsFetching with false and then true after 1m', () => {
	jest.useFakeTimers();
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<ControlBar />
			</BrowserRouter>
		</Provider>
	);
	act(() => {
		fireEvent.click(screen.getByText('Timer'));
	});
	act(() => {
		fireEvent.click(screen.getByText('1M'));
	});
	expect(mockedStore.dispatch).toHaveBeenCalledWith(setIsFetching(false));
	act(() => {
		jest.advanceTimersByTime(600000);
	});
	expect(mockedStore.dispatch).toHaveBeenCalledWith(setIsFetching(true));
});

it('calls setIsFetching with false and then true after 2m', () => {
	jest.useFakeTimers();
	act(() => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<ControlBar />
				</BrowserRouter>
			</Provider>
		);
	});
	act(() => {
		fireEvent.click(screen.getByText('Timer'));
	});

	expect(screen.getByText(/2M/i)).toBeInTheDocument();

	act(() => {
		fireEvent.click(screen.getByText('2M'));
	});

	expect(mockedStore.dispatch).toHaveBeenCalledWith(setIsFetching(false));
	expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);

	act(() => {
		jest.advanceTimersByTime(1200000);
	});

	expect(mockedStore.dispatch).toHaveBeenCalledWith(setIsFetching(true));
	expect(mockedStore.dispatch).toHaveBeenCalledTimes(2);
});

it('should navigate to the Watch Group page', () => {
	act(() => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<ControlBar />
				</BrowserRouter>
			</Provider>
		);
	});
	const watchingGroupElement = screen.getByTestId('navigate-watch-group');
	act(() => {
		fireEvent.click(watchingGroupElement);
	});
	expect(mockedUsedNavigate).toHaveBeenCalledWith('watching_group');
});
