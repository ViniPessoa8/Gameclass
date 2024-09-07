<script>
	export let href;
	export let backgroundColor = 'var(--cor-secundaria)';
	export let color = 'var(--cor-primaria)';
	export let borderRadius;
</script>

<a {href}>
	<button
		class="button"
		style="
			background-color: {backgroundColor};
			color: {color};
			border-radius: {borderRadius}"
		on:click
	>
		<slot />
	</button>
</a>

<style>
	.button {
		border: none;
		height: 48px;
		width: fit-content;
		font-size: 24px;
		font-family: var(--font);
		font-weight: bold;
		border-radius: 15px;
		padding: 10px 15px;
	}

	.button:hover {
		background-color: #a1a1a1;
		transition: 0.3s;
		cursor: pointer;
	}
</style>
