<script>
	/** {options}
	* Lista de opções a serem escolhidas.

	* Dicionário no seguinte formato:
	* {
	* 	name: str, // identificador do campo.
	*	text: str  // texto que será mostrado como opção.
	* }
	*/
	export let options = [];

	// Variável de controle da tag input
	export let group = [];
	export let selected = '';
	export let requerConfirmacao = false;
	export let disabled = false;
	export let onClickOption = () => {};

	if (options) {
		group = options[0].text;
	}
</script>

<div class="container">
	{#each options as option, index}
		<div class="row">
			{#if index === 0}
				<input
					name={option.name}
					id={option.name}
					type="radio"
					value={option.text}
					checked={selected.trim() == option.text}
					on:change
					{disabled}
					on:click={(e) => {
						if (requerConfirmacao) {
							e.preventDefault();
						}
						onClickOption(option.text);
					}}
				/>
			{:else}
				<input
					name={option.name}
					id={option.name}
					type="radio"
					value={option.text}
					checked={selected.trim() == option.text}
					on:change
					{disabled}
					on:click={(e) => {
						if (requerConfirmacao) {
							e.preventDefault();
						}
						onClickOption(option.text);
					}}
				/>
			{/if}
			<label for={option.name}>{option.text}</label>
		</div>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-items: center;
		gap: 8px;
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 8px;
	}

	label {
		font-size: 20px;
	}
</style>
