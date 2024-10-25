<script>
	import { helpers } from '../helpers';

	let { keyValuePair } = $props();

	let resultHtml = $state('');

	const divider = '~';

	// Renders key/value pair as html string
	const keyValueToHtmlString = ({ key, value }) => {
		let valuesStrings = helpers.escapeHtml(value).split(';');
		let valuesHtml = valuesStrings.join(`</span><span class="d">;</span><span class="v">`);

		return `<div class="r">
            <span class="k">${helpers.escapeHtml(key)}</span>
            <span class="d">${divider}</span>
            <span class="v">${valuesHtml}</span>
          </div>`;
	};

	const formattedResults = keyValueToHtmlString(keyValuePair);
	resultHtml = formattedResults;
</script>

{@html resultHtml}
