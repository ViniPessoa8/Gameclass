<script>
	let {
		optionList,
		inputHandler,
		value = $bindable(),
		name = '',
		borded = false,
		unselectedText = '',
		width
	} = $props();
</script>

{#if borded}
	<select class="borded" style="width: {width}px;" onchange={inputHandler} bind:value {name}>
		{#if unselectedText != ''}
			<option value="" disabled selected>{unselectedText}</option>
		{/if}
		{#each optionList as opt}
			<option class="option">{opt}</option>
		{/each}
	</select>
{:else}
	<select class="unborded" style="width: {width}px;" onchange={inputHandler} bind:value {name}>
		{#if unselectedText != ''}
			<option value="" disabled selected>{unselectedText}</option>
		{/if}
		{#each optionList as opt}
			<option class="option">{opt}</option>
		{/each}
	</select>
{/if}

<style>
	.borded {
		background-color: var(--cor-primaria);
		padding: 14px;
		border-radius: 12px;
	}

	select {
		border: none;
		font-family: var(--font);
		background-color: transparent;
		color: var(--text-1);
		font-size: 24px;
	}

	.unborded {
		border-bottom: 1px solid var(--cor-secundaria);
	}

	select:focus {
		outline: none;
	}

	select::after {
		outline: none;
	}

	select option {
		background-color: var(--cor-secundaria);
	}
</style>
