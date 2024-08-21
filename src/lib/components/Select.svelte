<script>
	export let optionList;
	export let inputHandler;
	export let value;
	export let name = '';
</script>

<select on:change={inputHandler} bind:value {name}>
	<option value="" disabled selected>Selecione sua Instituição</option>
	{#each optionList as opt}
		<option class="option">{opt}</option>
	{/each}
</select>

<style>
	select {
		border: none;
		font-family: var(--font);
		border-bottom: 1px solid var(--cor-secundaria);
		background-color: transparent;
		color: var(--text-1);
		font-size: 24px;
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
