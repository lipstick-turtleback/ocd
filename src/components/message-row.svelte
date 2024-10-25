<script>
	let { messageText } = $props();
</script>

{#if messageText}
	<div class="row message-text">{messageText}</div>
{/if}

<style>
	.message-text {
		padding: 25px;
		justify-content: center;
	}
</style>
