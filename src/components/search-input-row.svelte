<script>
	import { sharedState } from '../shared-state';
	import { config } from '../config';

	let { setMessageText = () => {}, setSetSearchResultsKeyValuePairs } = $props();

	let searchString = $state('');

	// Search translations from the loaded dictionary
	const searchForTranslationPairs = (searchQuery = '') => {
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

	const onInputChange = () => {
		let tmp = searchString.trim().toLowerCase() || '';
		let pairs = searchForTranslationPairs(tmp);
		setSetSearchResultsKeyValuePairs(pairs);
	};
</script>

<div class="row">
	<input
		type="text"
		id="searchInput"
		placeholder="search here"
		class="boxsizingBorder"
		autocomplete="off"
		onchange={onInputChange}
		oninput={onInputChange}
		bind:value={searchString}
	/>
</div>
