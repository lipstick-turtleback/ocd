<script>
	import { browser } from '$app/environment';
	import { sharedState } from '../shared-state';
	import { config } from '../config';
	import { helpers } from '../helpers';

	import FileReaderRow from '../components/file-reader-row.svelte';
	import SearchResultsRow from '../components/search-results-row.svelte';
	import MessageRow from '../components/message-row.svelte';
	import SearchInputRow from '../components/search-input-row.svelte';
	import HeaderRow from '../components/header-row.svelte';

	let appContainerClass = $state('');
	let messageText = $state('');
	let searchResultsKeyValuePairs = $state([]);

	const setAppContainerClass = (className = '') => {
		appContainerClass = className;
	};

	const setMessageText = (text = '') => {
		messageText = text;
	};

	const setSetSearchResultsKeyValuePairs = (val = []) => {
		searchResultsKeyValuePairs = val;
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

	browser && tryLoadRecentDict();
</script>

<div id="appContainer" class="app-container {appContainerClass}">
	<HeaderRow {setAppContainerClass} />

	<SearchInputRow {setMessageText} {setSetSearchResultsKeyValuePairs} />

	<MessageRow {messageText} />

	<SearchResultsRow keyValuePairs={searchResultsKeyValuePairs} />

	<FileReaderRow {setMessageText} {setSetSearchResultsKeyValuePairs} />
</div>

<style>
	.app-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 20px;
	}
</style>
