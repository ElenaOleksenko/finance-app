import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from '../NotFound';

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

it('should render the component', async () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<NotFound />
			</BrowserRouter>
		</Provider>
	);

	expect(
		screen.getByText(`Sorry, this page doesn't exist`)
	).toBeInTheDocument();
});
