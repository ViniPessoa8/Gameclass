<script>
	export let color = 'white';
	export let size = 60;
	export let fontSize = 30;
	export let backgroundColor = getComputedStyle(document.body).getPropertyValue('--cor-primaria');
</script>

<div
	class="icon"
	style="
		background-color: {backgroundColor}; 
		color: {color};
		height: {size}px;
		width: {size}px;
		"
>
	<h1 class="info" style="font-size: {fontSize}px;">
		<slot></slot>
	</h1>
</div>

<style>
	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100%;
	}

	.icon > .info {
		text-align: center;
		justify-self: center;
	}
</style>

