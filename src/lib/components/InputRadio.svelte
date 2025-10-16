<script>
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();

	/**
	 * @typedef {Object} Props
	 * @property {any} [options] - {options}
Lista de opções a serem escolhidas.
Dicionário no seguinte formato:
{
name: str, // identificador do campo.
text: str  // texto que será mostrado como opção.
}
	 * @property {any} [group] - Variável de controle da tag input
	 * @property {string} [selected]
	 * @property {boolean} [requerConfirmacao]
	 * @property {boolean} [disabled]
	 * @property {any} [onClickOption]
	 */

	/** @type {Props} */
	let {
		options = [],
		group = $bindable([]),
		selected = '',
		requerConfirmacao = false,
		disabled = false,
		onClickOption = () => {},
		...rest
	} = $props();

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
					onchange={bubble('change')}
					{disabled}
					{...rest}
					onclick={(e) => {
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
					onchange={bubble('change')}
					{disabled}
					{...rest}
					onclick={(e) => {
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
