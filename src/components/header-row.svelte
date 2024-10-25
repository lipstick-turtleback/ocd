<script>
	let { setAppContainerClass = () => {} } = $props();

	const textTransformOptions = ['none', 'lowercase', 'uppercase'];
	let selectedtextTransformOption = $state(0);

	const onTextTransformSwitchClick = async () => {
		selectedtextTransformOption = (selectedtextTransformOption + 1) % 3;
		const appContainerClass = textTransformOptions[selectedtextTransformOption];
		console.log(appContainerClass);
		setAppContainerClass(appContainerClass);
	};
</script>

<div class="row first-row">
	<h1 class="text-transform-switch">
		<!-- svelte-ignore a11y_invalid_attribute -->
		<a href="#" onclick={onTextTransformSwitchClick}>Offline СSV Dictionary</a>
	</h1>

	<div class="version-number">
		<a href="https://github.com/lipstick-turtleback/awesome-dictionary" target="_blank">
			v24.10.24
		</a>
	</div>
</div>

<style>
	.text-transform-switch a {
		text-decoration: none;
		color: #333;
	}
</style>
