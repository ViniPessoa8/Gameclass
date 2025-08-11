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
	let { segments } = $props();
	let popupContent = $state('');
	let popupStyle = $state({
		left: '0px',
		transform: 'translateX(-50%)',
		opacity: 0,
		backgroundColor: '#333'
	});

	const total = $derived(segments.reduce((sum, segment) => sum + segment.value, 0));

	function handleMouseEnter(index, node) {
		if (!node) return;

		const popupLeft = node.offsetLeft + node.offsetWidth / 2;

		popupContent =
			segments[index].value > 0
				? `${segments[index].descricao}: ${segments[index].value}`
				: segments[index].descricao;
		popupStyle.left = `${popupLeft}px`;
		popupStyle.transform = 'translateX(-50%)';
		popupStyle.backgroundColor = segments[index].backgroundColor;
		popupStyle.color = segments[index].color;
		popupStyle.opacity = 1;
	}
	function handleMouseLeave() {
		popupStyle.opacity = 0;
	}
</script>

<div
	class="progress-bar-container"
	aria-label="Barra de progresso"
	role="tooltip"
	onmouseleave={handleMouseLeave}
>
	<div class="progress-bar">
		{#each segments as segment, i (i)}
			<div
				class="progress-segment"
				style="width: {total > 0
					? (segment.value / total) * 100
					: 100}%; background-color: {segment.backgroundColor}; "
				aria-label={segment.nome}
				role="progressbar"
				onmouseenter={(event) => handleMouseEnter(i, event.currentTarget)}
			>
				<span class={segment.value > 0 ? 'segment-label' : 'segment-label zero'}
					>{segment.value}</span
				>
			</div>
		{/each}
	</div>

	<div
		class="hover-info"
		style="left: {popupStyle.left}; transform: {popupStyle.transform}; opacity: {popupStyle.opacity}; background-color: {popupStyle.backgroundColor}; color: {popupStyle.color}; --arrow-color: {popupStyle.backgroundColor};
		"
	>
		{popupContent}
	</div>
</div>

<style>
	.progress-bar-container {
		width: 100%;
		position: relative;
		padding-bottom: 25px;
	}

	.progress-bar {
		display: flex;
		width: 100%;
		height: 12px;
		border-radius: 6px;
	}

	.progress-segment {
		position: relative;
		height: 100%;
		transition: width 0.4s ease-in-out;
		cursor: pointer;
	}

	.progress-segment:first-child {
		border-top-left-radius: 6px;
		border-bottom-left-radius: 6px;
	}

	.progress-segment:last-child {
		border-top-right-radius: 6px;
		border-bottom-right-radius: 6px;
	}

	.progress-segment:only-child {
		border-radius: 6px;
	}

	.segment-label {
		position: absolute;
		bottom: -22px;
		right: 0;
		transform: translateX(50%);
		font-size: 0.875rem;
		font-weight: 500;
		color: #828282;
		pointer-events: none;
	}

	.zero {
		left: 0;
	}

	.progress-segment:last-child .segment-label {
		transform: translateX(0);
	}

	.hover-info {
		position: absolute;
		top: -50px;
		box-sizing: border-box;
		padding: 8px 12px;
		border-radius: 4px;
		text-align: center;
		font-size: 1rem;
		font-weight: 600;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
		transition: opacity 0.3s ease-in-out;
		pointer-events: none;
		white-space: nowrap;
		z-index: 10;
	}

	.hover-info::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 35px;
		transform: translateX(-50%);
		border-width: 5px;
		border-style: solid;
		border-color: transparent transparent var(--arrow-color) transparent;
		pointer-events: none;
	}
</style>
