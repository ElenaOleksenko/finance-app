import { formatData } from './helpers';

it('formats date correctly', () => {
	const dataUtf = '2023-10-23T12:34:56Z';
	const formattedDate = formatData(dataUtf);
	expect(formattedDate).toBe('23.10.2023');
});
