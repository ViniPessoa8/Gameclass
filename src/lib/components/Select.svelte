<script>
	export let optionList;
	export let inputHandler;
	export let value;
	export let name = '';
	export let borded = false;
	export let unselectedText = '';
	export let width;
</script>

{#if borded}
	<!-- <div class="board"> -->
	<select class="boarded" style="width: {width}px;" on:change={inputHandler} bind:value {name}>
		{#if unselectedText != ''}
			<option value="" disabled selected>{unselectedText}</option>
		{/if}
		{#each optionList as opt}
			<option class="option">{opt}</option>
		{/each}
	</select>
	<!-- </div> -->
{:else}
	<select class="unborded" style="width: {width}px;" on:change={inputHandler} bind:value {name}>
		{#if unselectedText != ''}
			<option value="" disabled selected>{unselectedText}</option>
		{/if}
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
