<script>
	import { helpers } from '../helpers';
	import { sharedState } from '../shared-state';
	import { config } from '../config';

	let { setMessageText, setSetSearchResultsKeyValuePairs } = $props();

	let selectedFile = $state(null);
	let redrawCounter = $state(null);

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
			setMessageText(`${items.length} lines loaded from csv file.`);
			setSetSearchResultsKeyValuePairs([]);
			setRedraw();
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

		onReadCsvFileClick();
	};

	const setRedraw = () => {
		redrawCounter = new Date();
	};
</script>

<div class="row last-row xxx">
	{#key redrawCounter}
		<div class="links-container">
			<!-- svelte-ignore a11y_invalid_attribute -->
			<a href="#" onclick={setRedraw}>Choose CSV file.</a>
			<a href="/example.csv">example.csv</a>
			<div class="file-selector">
				<label for="csvFileInput">Choose CSV file.</label>
				<input
					type="file"
					id="csvFileInput"
					accept=".csv"
					class="boxsizingBorder"
					onchange={onSelectedFileChange}
				/>
			</div>
		</div>
	{/key}
</div>

<style>
	.links-container {
		position: relative;
	}

	.links-container a {
		margin: 10px 25px;
		display: inline-block;
	}

	.file-selector input {
		display: none;
	}

	.file-selector label {
		opacity: 0;
		position: absolute;
		display: inline-block;
		top: 10px;
		left: 25px;
		cursor: pointer;
	}
</style>
