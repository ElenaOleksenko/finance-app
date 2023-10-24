export const formatData = (dataUtf) => {
	const date = new Date(dataUtf);

	const day = date.getDate();
	// const monthNames = [
	// 	'січня',
	// 	'лютого',
	// 	'березня',
	// 	'квітня',
	// 	'травня',
	// 	'червня',
	// 	'липня',
	// 	'серпня',
	// 	'вересня',
	// 	'жовтня',
	// 	'листопада',
	// 	'грудня',
	// ];
	const monthIndex = date.getMonth();
	const monthName = monthIndex + 1;
	const year = date.getFullYear();

	const formattedDate = `${day}.${monthName}.${year}`;

	return formattedDate;
};
