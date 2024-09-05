<script>
	export let color = 'white';
	export let size = 60;
	export let src, alt;
</script>

<div
	class="icon"
	style="
		background-color: var(--cor-primaria); 
		color: {color};
		height: {size}px;
		width: {size}px;
		"
>
	<img {src} {alt} />
</div>

<style>
	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100%;
	}

	.icon > img {
		align-self: center;
		justify-self: center;
	}
</style>
