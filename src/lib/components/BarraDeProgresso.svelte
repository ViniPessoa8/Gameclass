<script>
	import { COLORS } from '../constants';
	export let width;
	export let input = [1, 2, 3]; // input[0] > input[1] > input[2] > ....

	checkInput(input);

	let input_step;
	$: input_step = width / input.length;
	const colors = [COLORS.secundaria_1, COLORS.secundaria_2, COLORS.secundaria_3];

	function checkInput(input) {
		if (!Array.isArray(input)) {
			throw new Error('Input must be an array.');
		}

		for (let i = 0; i < input.length; i++) {
			if (input[i] > input[i + 1]) {
				throw new Error('The array must be in ascending order. (input[0] > input[1] > ...)');
			}
		}
	}
</script>

<div class="barra-container">
	{#each input as num, index}
		<div
			class="barra-progresso"
			style:width="{(index + 1) * input_step - 12}px"
			style:background-color={colors[index]}
			style:z-index={100 - index}
		>
			{num}
		</div>
	{/each}
</div>

<style>
	.barra-container {
		position: relative;
		display: flex;
		flex-direction: row;
		margin-top: 4px;
		height: 24px;
		border-radius: 40px;
	}

	.barra-progresso {
		border-radius: 0px 40px 40px 0px;
		position: absolute;
		display: flex;
		flex-direction: row;
		justify-content: end;
		box-sizing: border-box;
		padding-right: 8.65px;
		font-weight: 800;
	}
</style>
