<script>
	let { messageText } = $props();
</script>

{#if messageText}
	<div class="row message-text">{messageText}</div>
{/if}
