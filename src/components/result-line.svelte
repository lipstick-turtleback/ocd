<script>
	import { helpers } from '../helpers';
	let { keyValuePair } = $props();
	const divider = '~';

	const key = helpers.escapeHtml(keyValuePair?.key);
	const value = helpers.escapeHtml(keyValuePair?.value);
	const values = value.split(';').map((x) => x.trim());

	// TODO: optimize this later
	const onlyTags = values
		.filter((x) => x.startsWith('[') && x.endsWith(']'))
		.map((x) => x.slice(1).slice(0, -1));
	const onlyValues = values.filter((x) => !x.startsWith('[') && !x.endsWith(']'));
</script>

<div class="r">
	<div class="k">{key}</div>
	<div class="d">{divider}</div>
	{#each onlyValues as val, i}
		<div class="v">{val}</div>
		{#if i + 1 < values.length}<div class="d">;</div>{/if}
	{/each}
	{#each onlyTags as tag, i}
		<div class="t">{tag}</div>
		{#if i + 1 < values.length}<div class="d">;</div>{/if}
	{/each}
</div>

<style>
	.r {
		padding: 7px 0;
		display: flex;
		flex-wrap: wrap;
	}

	.r .k,
	.r .v,
	.r .t {
		display: inline-block;
	}

	.r .k:hover,
	.r .v:hover,
	.r .t:hover {
		text-decoration: underline;
		cursor: pointer;
	}

	.r .k {
		color: #a33;
	}

	.r .d {
		color: #aaa;
		margin: 0 7px;
	}

	.r .v {
		color: #33a;
	}

	.r .t {
		color: #393;
	}
</style>
