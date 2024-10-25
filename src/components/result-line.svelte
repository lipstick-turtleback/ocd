<script>
	import { helpers } from '../helpers';
	let { keyValuePair } = $props();
	const divider = '~';

	const key = helpers.escapeHtml(keyValuePair?.key);
	const value = helpers.escapeHtml(keyValuePair?.value);
	const values = value.split(';');
</script>

<div class="r">
	<div class="k">{key}</div>
	<div class="d">{divider}</div>
	{#each values as val, i}
		<div class="v">{val}</div>
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
	.r .v {
		display: inline-block;
	}

	.r .k:hover,
	.r .v:hover {
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
</style>
