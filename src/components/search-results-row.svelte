<script>
	import ResultLine from './result-line.svelte';

	let { keyValuePairs } = $props();

	// Copies to clipboard the clicked key or value text
	const onKeyValueClick = async (event) => {
		try {
			const elClasses = event?.target?.classList;
			if (elClasses.contains('k') || elClasses.contains('v') || elClasses.contains('t')) {
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
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if keyValuePairs?.length > 0}
	{#key keyValuePairs}
		<div class="row results-container" onclick={onKeyValueClick}>
			{#each keyValuePairs as keyValuePair}
				<ResultLine {keyValuePair} />
			{/each}
		</div>
	{/key}
{/if}

<style>
	.results-container {
		display: flex;
		flex-direction: column;
		overflow: auto;
		max-height: 100vh;
	}
</style>
