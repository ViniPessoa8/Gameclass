<script>
	/**
	 * @typedef {Object} Props
	 * @property {number} [currentLevel] - O nível atual do usuário.
	 * @property {number} [currentPoints] - A quantidade de XP que o usuário possui atualmente.
	 * @property {number} [pointsForCurrentLevel] - A quantidade de XP necessária para alcançar o nível atual.
	 * @property {number} [pointsForNextLevel] - A quantidade de XP necessária para avançar para o próximo nível.
	 */

	/** @type {Props} */
	let {
		currentLevel = 3,
		currentPoints = 376,
		pointsForCurrentLevel = 300,
		pointsForNextLevel = 400
	} = $props();

	let nextLevel = $derived(currentLevel + 1);

	// Calcula a faixa de XP para o nível atual
	let pointsRange = $derived(pointsForNextLevel - pointsForCurrentLevel);

	// Calcula quanto XP o usuário progrediu dentro do nível atual
	let pointsProgressInLevel = $derived(currentPoints - pointsForCurrentLevel);

	// Calcula a porcentagem de progresso e garante que ela fique entre 0 e 100
	let progressPercentage = $derived(
		Math.max(0, Math.min(100, (pointsProgressInLevel / pointsRange) * 100))
	);
</script>

<div class="progress-container">
	<div class="labels-container">
		<span class="level-label">Nível {currentLevel} ({pointsForCurrentLevel} pontos)</span>
		<span class="level-label">Nível {nextLevel} ({pointsForNextLevel} pontos)</span>
	</div>

	<div class="progress-bar-background">
		<div class="progress-bar-fill" style="width: {progressPercentage}%;"></div>
	</div>

	<div class="current-points-label" style="left: {progressPercentage}%;">
		{currentPoints}
	</div>
</div>

<style>
	.progress-container {
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
			'Helvetica Neue', sans-serif;
		width: 100%;
		max-width: 600px; /* Largura máxima para melhor visualização */
		position: relative;
		padding: 10px;
		border-radius: 12px;
	}

	.labels-container {
		display: flex;
		justify-content: space-between;
		margin-bottom: 8px;
		color: var(--cor-primaria);
		font-size: 14px;
		font-weight: bold;
	}

	.progress-bar-background {
		width: 100%;
		height: 20px;
		background-color: var(--cor-primaria);
		border-radius: 10px;
		overflow: hidden;
	}

	.progress-bar-fill {
		height: 100%;
		background-color: var(--cor-secundaria);
		border-radius: 10px;
		transition: width 0.5s ease-in-out;
	}

	.current-points-label {
		position: absolute;
		bottom: -15px;
		color: var(--cor-secundaria);
		font-size: 13px;
		font-weight: 500;
		transform: translateX(-50%);
		transition: left 0.5s ease-in-out;
	}
</style>
