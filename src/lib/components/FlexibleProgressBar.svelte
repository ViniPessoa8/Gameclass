<script>
	/**
	 * @typedef {Object} Segment
	 * @property {number} value - O valor (peso) da seção, que determina sua largura proporcional.
	 * @property {string} color - A cor de fundo da seção (ex: '#8A2BE2', 'rgb(0, 255, 0)').
	 */

	/**
	 * @type {Segment[]}
	 * Uma lista de objetos, onde cada objeto representa uma seção na barra.
	 */
	export let segments = [];

	// $: é uma declaração reativa em Svelte.
	// Este código será re-executado sempre que a prop `segments` mudar.
	$: total = segments.reduce((sum, segment) => sum + segment.value, 0);
</script>

<div class="progress-bar-container" aria-label="Barra de progresso">
	<div class="progress-bar">
		{#each segments as segment, i (i)}
			<div
				class="progress-segment"
				style="width: {total > 0
					? (segment.value / total) * 100
					: 100}%; background-color: {segment.color};"
				aria-valuenow={segment.value}
				aria-valuemin="0"
				aria-valuemax={total}
				role="progressbar"
			>
				<span class="segment-label">{segment.value}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.progress-bar-container {
		width: 100%;
		/* Adiciona espaço abaixo para os números não serem cortados do layout */
		padding-bottom: 25px;
		font-family: sans-serif; /* Recomendo definir uma fonte para consistência */
	}

	.progress-bar {
		display: flex;
		width: 100%;
		height: 12px;
		border-radius: 6px;
		position: relative;
	}

	.progress-segment {
		position: relative;
		height: 100%;
		transition: width 0.4s ease-in-out;
	}

	/* Aplica o raio da borda no primeiro e último elemento para criar o efeito de pílula */
	.progress-segment:first-child {
		border-top-left-radius: 6px;
		border-bottom-left-radius: 6px;
	}

	.progress-segment:last-child {
		border-top-right-radius: 6px;
		border-bottom-right-radius: 6px;
	}

	/* Garante que, se houver apenas um segmento, ele tenha todas as bordas arredondadas */
	.progress-segment:only-child {
		border-radius: 6px;
	}

	.segment-label {
		position: absolute;
		bottom: -22px; /* Posição abaixo da barra */
		right: 0;
		/* Centraliza o número na linha de divisão */
		transform: translateX(50%);
		font-size: 0.875rem; /* 14px */
		font-weight: 500;
		color: #828282; /* Cinza neutro, como na imagem */
	}

	/* O último número deve ficar alinhado ao final da barra, e não no meio da borda */
	.progress-segment:last-child .segment-label {
		transform: translateX(0);
	}
</style>
