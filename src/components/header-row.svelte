<script>
	let { setAppContainerClass = () => {} } = $props();

	const textTransformOptions = ['none', 'lowercase', 'uppercase'];
	let selectedtextTransformOption = $state(0);

	const onTextTransformSwitchClick = async (event) => {
		selectedtextTransformOption = (selectedtextTransformOption + 1) % 3;
		const appContainerClass = textTransformOptions[selectedtextTransformOption];
		console.log(appContainerClass);
		setAppContainerClass(appContainerClass);
	};
</script>

<div class="row first-row">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<h1 id="textTransformSwitch" class="v" onclick={onTextTransformSwitchClick}>
		Offline СSV Dictionary
	</h1>
	<div class="version-number">
		<a href="https://github.com/lipstick-turtleback/awesome-dictionary" target="_blank">
			v24.10.24
		</a>
	</div>
</div>
