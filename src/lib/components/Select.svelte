<script>
	export let optionList;
	export let inputHandler;
	export let value;
	export let name = '';
	export let borded = false;
</script>

{#if borded}
	<!-- <div class="board"> -->
	<select class="boarded" on:change={inputHandler} bind:value {name}>
		<option value="" disabled selected>Selecione sua Instituição</option>
		{#each optionList as opt}
			<option class="option">{opt}</option>
		{/each}
	</select>
	<!-- </div> -->
{:else}
	<select class="unborded" on:change={inputHandler} bind:value {name}>
		<option value="" disabled selected>Selecione sua Instituição</option>
		{#each optionList as opt}
			<option class="option">{opt}</option>
		{/each}
	</select>
{/if}

<style>
	.boarded {
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
