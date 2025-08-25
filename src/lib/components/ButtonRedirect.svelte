<script>
	export let href;
	export let backgroundColor = 'var(--cor-secundaria)';
	export let color = 'var(--cor-primaria)';
	export let borderRadius;
	export let disabled = false;
	export let size;

	$: width = size ? `${size}px` : undefined;
</script>

<a {href}>
	<button
		class="button"
		class:disabled
		{disabled}
		{...$$restProps}
		style:width
		style:height={width}
		style:color
		style:background-color={backgroundColor}
		style:border-radius={borderRadius}
		on:click
	>
		<slot />
	</button>
</a>

<style scoped>
	.button {
		border: none;
		height: 48px;
		width: fit-content;
		font-size: 24px;
		font-family: var(--font);
		font-weight: bold;
		border-radius: 15px;
		padding: 10px 15px;
		display: flex;
		align-items: center;
	}

	a {
		text-decoration: none;
	}

	.button:hover {
		background-color: #a1a1a1;
		transition: 0.3s;
		cursor: pointer;
	}

	.button:not(.disabled):hover {
		background-color: #a1a1a1;
		cursor: pointer;
	}

	.button.disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
