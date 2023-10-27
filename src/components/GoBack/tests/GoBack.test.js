import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GoBack } from '../GoBack';
import { BrowserRouter } from 'react-router-dom';

test('renders GoBack component', () => {
	render(
		<BrowserRouter>
			<GoBack />
		</BrowserRouter>
	);
	const goBackText = screen.getByText(/Go Back/i);
	expect(goBackText).toBeInTheDocument();
	fireEvent.click(goBackText);
});
