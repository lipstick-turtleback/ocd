<script>
	import { helpers } from '../helpers';
	import { sharedState } from '../shared-state';
	import { config } from '../config';

	let { setMessageText } = $props();

	// Save dictionary items to localStorage
	const saveDictionaryItems = () => {
		try {
			localStorage.setItem(
				config.LOCAL_STORAGE_ITEM_KEY,
				JSON.stringify(sharedState.dictionaryItems, null, 2)
			);
		} catch (error) {
			helpers.handleError('Error saving dictionary to localStorage', error);
		}
	};

	// Handle CSV file load and store the parsed content
	const onCsvFileLoad = (event) => {
		const csvContent = event.target.result;
		const parsedItems = helpers.parseCSVContent(csvContent);

		if (parsedItems.length > 0) {
			sharedState.dictionaryItems = parsedItems;
			saveDictionaryItems();
			setMessageText(`${sharedState.dictionaryItems.length} lines loaded!`);
		} else {
			setMessageText('No valid entries found in the CSV file.');
		}
	};

	// Handle file selection and reading
	const onReadCsvFileClick = () => {
		const fileInputEl = window.document.getElementById('csvFileInput');
		const selectedFile = fileInputEl?.files?.[0];
		if (!selectedFile) {
			alert('Please select a CSV file first.');
			return;
		}

		const fileReader = new FileReader();
		fileReader.onload = onCsvFileLoad;
		fileReader.readAsText(selectedFile);
	};
</script>

<div class="row last-row">
	<div class="select-csv">
		<label for="csvFileInput">Choose CSV file.</label>
		<input type="file" id="csvFileInput" accept=".csv" class="boxsizingBorder" />
	</div>
	<div class="load-csv">
		<button id="readFileButton" class="boxsizingBorder" onclick={onReadCsvFileClick}>
			Read File
		</button>
	</div>
</div>
