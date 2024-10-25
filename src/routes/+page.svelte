<script>
	import { browser } from '$app/environment';
	import { sharedState } from '../shared-state';
	import { config } from '../config';
	import { helpers } from '../helpers';

	const textTransformOptions = ['none', 'lowercase', 'uppercase'];
	let appContainerClass = $state('');
	let selectedtextTransformOption = $state(0);

	let searchString = $state('');
	let messageText = $state('');
	let resultHtml = $state('');

	// Switches text transform class
	// @ts-ignore
	const onTextTransformSwitchClick = async (event) => {
		onKeyValueClick(event);
		selectedtextTransformOption = (selectedtextTransformOption + 1) % 3;
		appContainerClass = textTransformOptions[selectedtextTransformOption];
		console.log(appContainerClass);
	};

	// Copies to clipboard the clicked key or value text
	// @ts-ignore
	const onKeyValueClick = async (event) => {
		try {
			const elClasses = event?.target?.classList;
			if (elClasses.contains('k') || elClasses.contains('v')) {
				const text = event?.target?.innerText;
				console.log(`click -> copy -> ${text}`);

				navigator.clipboard.writeText(text);
				event.target.classList.add('clicked-text');

				setTimeout(() => {
					event.target.classList.remove('clicked-text');
				}, 500);
			}
		} catch (e) {
			console.error(e);
		}
	};

	// Try to load the dictionary from localStorage if available
	const tryLoadRecentDict = async () => {
		try {
			const storedItems = localStorage.getItem(config.LOCAL_STORAGE_ITEM_KEY);
			if (storedItems) {
				sharedState.dictionaryItems = JSON.parse(storedItems);
				setMessageText(`${sharedState.dictionaryItems.length} lines loaded!`);
			} else {
				setMessageText('Start by selecting a CSV file.');
			}
		} catch (error) {
			helpers.handleError('Error loading dictionary from localStorage', error);
		}
	};

	// Handle CSV file load and store the parsed content
	// @ts-ignore
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
		const fileInputEl = browser && window.document.getElementById('csvFileInput');
		const selectedFile = fileInputEl?.files?.[0];
		if (!selectedFile) {
			alert('Please select a CSV file first.');
			return;
		}

		const fileReader = new FileReader();
		fileReader.onload = onCsvFileLoad;
		fileReader.readAsText(selectedFile);
	};

	const setMessageText = (text = '') => {
		messageText = text;
	};

	// Set the result text to the searchResultEl
	const setResultHtml = (html = '') => {
		resultHtml = html;
	};

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

	// Renders key/value pair as html string
	const keyValueToHtmlString = ({ key, value }) => {
		let valuesStrings = helpers.escapeHtml(value).split(';');
		let valuesHtml = valuesStrings.join(`</span><span class="d">;</span><span class="v">`);

		return `<div class="r">
            <span class="k">${helpers.escapeHtml(key)}</span>
            <span class="d">${helpers.divider}</span>
            <span class="v">${valuesHtml}</span>
          </div>`;
	};

	// Search translations from the loaded dictionary
	const searchTranslations = (searchQuery = '') => {
		if (!sharedState.dictionaryItems.length) {
			setMessageText('Please load a CSV file first.');
			return [];
		}

		if (!searchQuery) {
			setMessageText('Please enter a word to search.');
			return [];
		}

		if (searchQuery.length < 2) {
			setMessageText('Please enter at least 2 characters.');
			return [];
		}

		const filteredKeyValuePairs = sharedState.dictionaryItems.filter(
			({ key, value }) =>
				key.toLowerCase().includes(searchQuery) || value.toLowerCase().includes(searchQuery)
		);

		if (!filteredKeyValuePairs.length) {
			setMessageText('No matches found.');
			return [];
		}

		if (filteredKeyValuePairs.length > config.MAX_RESULTS) {
			setMessageText(`Too many results! (${filteredKeyValuePairs.length})`);
			return [];
		}

		setMessageText('');

		return filteredKeyValuePairs;
	};

	const onIputChange = () => {
		let tmp = searchString.trim().toLowerCase() || '';
		let searchResultsKeyValuePairs = searchTranslations(tmp);
		const formattedResults = searchResultsKeyValuePairs.map(keyValueToHtmlString).join('\n');
		setResultHtml(formattedResults);
	};

	browser && tryLoadRecentDict();
</script>

<div id="appContainer" class="app-container {appContainerClass}">
	<div class="row first-row">
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<h1 id="textTransformSwitch" class="v" onclick={onTextTransformSwitchClick}>
			Offline СSV Dictionary
		</h1>
		<div class="version-number">
			<a href="https://github.com/lipstick-turtleback/awesome-dictionary" target="_blank">
				v24.10.24
			</a>
		</div>
	</div>

	<div class="row">
		<input
			type="text"
			id="searchInput"
			placeholder="search here"
			class="boxsizingBorder"
			autocomplete="off"
			onchange={onIputChange}
			oninput={onIputChange}
			bind:value={searchString}
		/>
	</div>

	{#if messageText}
		<div class="row message-text">{messageText}</div>
	{/if}

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="row results-container" onclick={onKeyValueClick}>
		<div class="search-result boxsizingBorder">{@html resultHtml}</div>
	</div>

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
</div>
