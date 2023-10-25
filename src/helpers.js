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

export function compareObjects(obj1, obj2) {
	console.log(obj1);
	console.log(obj2);
	// Перевірка, чи всі властивості об'єктів однакові
	console.log(Object.keys(obj1).every((key) => obj1[key] === obj2[key]));
	return Object.keys(obj1).every((key) => obj1[key] === obj2[key]);
}
