<script>
	export let color = 'white';
	export let backgroundColor = 'var(--cor-primaria)';
	export let size = 60;
	export let fontSize = 30;
	export let src,
		alt,
		text = '';
	export let type = 'img';
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
	{#if type === 'img'}
		<img {src} {alt} />
	{:else if type === 'text'}
		<h2 style="font-size: {fontSize}px;">
			{text}
		</h2>
	{/if}
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

	.icon > h2 {
		text-align: center;
		justify-self: center;
		width: 220px;
	}
</style>
