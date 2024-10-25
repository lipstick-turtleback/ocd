import { config } from './config';

// Detect CSV delimiter (comma or semicolon)
const detectSeparator = (data = '') => {
	const snippet = data.slice(0, config.MAX_SEPARATOR_DETECTING_DATA);
	const commaCount = (snippet.match(/,/g) || []).length;
	const semicolonCount = (snippet.match(/;/g) || []).length;

	const result = commaCount > semicolonCount ? ',' : ';';

	return result;
};

// Convert a row into a key-value object
const rowToDictRecordObj = (row = '', separator = ',') => {
	const [key, ...values] = row.split(separator).map((item) => item.trim());

	if (!key || values.length === 0) {
		return null;
	}

	const value = values.filter(Boolean).join('; ');
	return { key, value };
};

// Parse CSV content into key-value pairs
const parseCSVContent = (data = '') => {
	const separator = detectSeparator(data);
	const rows = data.split(config.ROWS_SEPARATOR);

	const result = rows.map((row) => rowToDictRecordObj(row, separator)).filter(Boolean);

	return result;
};

// Handle errors
const handleError = (message, error) => {
	console.error(message, error);
	alert(message);
};

// Utility function to escape HTML special characters
const escapeHtml = (unsafe) => {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
};

const helpers = {
	detectSeparator,
	rowToDictRecordObj,
	parseCSVContent,
	handleError,
	escapeHtml
};

export { helpers };
