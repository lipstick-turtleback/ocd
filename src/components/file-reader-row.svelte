<script>
	import { helpers } from '../helpers';
	import { sharedState } from '../shared-state';
	import { config } from '../config';

	let { setMessageText, setSetSearchResultsKeyValuePairs } = $props();

	let selectedFile = $state(null);

	const tryToSaveDictionaryItems = (items) => {
		try {
			localStorage.setItem(config.LOCAL_STORAGE_ITEM_KEY, JSON.stringify(items, null, 2));
		} catch (error) {
			helpers.handleError('Error saving dictionary to localStorage', error);
		}
	};

	const onCsvFileLoad = (event) => {
		const csvContent = event.target.result;
		const items = helpers.parseCSVContent(csvContent);

		if (items.length > 0) {
			sharedState.dictionaryItems = items;
			tryToSaveDictionaryItems(items);
			setMessageText(`${items.length} lines loaded!`);
			setSetSearchResultsKeyValuePairs([]);
		} else {
			setMessageText('No valid entries found in the CSV file.');
		}
	};

	const onReadCsvFileClick = () => {
		try {
			const fileReader = new FileReader();
			fileReader.onload = onCsvFileLoad;
			fileReader.readAsText(selectedFile);
		} catch (error) {
			helpers.handleError('Error reading the file.', error);
		}
	};

	const onSelectedFileChange = (event) => {
		const fileInputEl = window.document.getElementById('csvFileInput');
		selectedFile = fileInputEl?.files?.[0];

		console.log(selectedFile);
	};
</script>

<div class="row last-row">
	<div class="select-csv {!selectedFile ? 'no-file' : 'with-file'}">
		<label for="csvFileInput">Choose CSV file.</label>
		<input
			type="file"
			id="csvFileInput"
			accept=".csv"
			class="boxsizingBorder"
			onchange={onSelectedFileChange}
		/>
	</div>
	{#if selectedFile}
		<div class="load-csv {!selectedFile ? 'no-file' : 'with-file'}">
			<button id="readFileButton" class="boxsizingBorder" onclick={onReadCsvFileClick}>
				Read File
			</button>
		</div>
	{/if}
</div>

<style>
	.load-csv,
	.select-csv {
		display: inline-block;
	}

	.select-csv {
		flex: 1;
	}

	.no-file {
		color: #b00;
	}

	.with-file {
		color: #008600;
	}

	.select-csv label {
		opacity: 0;
		position: absolute;
		width: 0;
		height: 0;
		top: 0;
	}
</style>
