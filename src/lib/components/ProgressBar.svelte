<script>
  /**
   * O nível atual do usuário.
   * @type {number}
   */
  export let currentLevel = 3;

  /**
   * A quantidade de XP que o usuário possui atualmente.
   * @type {number}
   */
  export let currentXp = 376;

  /**
   * A quantidade de XP necessária para alcançar o nível atual.
   * @type {number}
   */
  export let xpForCurrentLevel = 300;

  /**
   * A quantidade de XP necessária para avançar para o próximo nível.
   * @type {number}
   */
  export let xpForNextLevel = 400;

  $: nextLevel = currentLevel + 1;

  // Calcula a faixa de XP para o nível atual
  $: xpRange = xpForNextLevel - xpForCurrentLevel;

  // Calcula quanto XP o usuário progrediu dentro do nível atual
  $: xpProgressInLevel = currentXp - xpForCurrentLevel;

  // Calcula a porcentagem de progresso e garante que ela fique entre 0 e 100
  $: progressPercentage = Math.max(0, Math.min(100, (xpProgressInLevel / xpRange) * 100));

</script>

<div class="progress-container">
  <div class="labels-container">
    <span class="level-label">Nível {currentLevel} ({xpForCurrentLevel} XP)</span>
    <span class="level-label">Nível {nextLevel} ({xpForNextLevel} XP)</span>
  </div>

  <div class="progress-bar-background">
    <div
      class="progress-bar-fill"
      style="width: {progressPercentage}%;"
    ></div>
  </div>

  <div
    class="current-xp-label"
    style="left: {progressPercentage}%;"
  >
    {currentXp} XP
  </div>
</div>

<style>
  .progress-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
    background-color: var(--cor-primaria); /* Azul escuro para o fundo da barra */
    border-radius: 10px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    background-color: var(--cor-secundaria); /* Azul claro para o preenchimento */
    border-radius: 10px;
    transition: width 0.5s ease-in-out; /* Animação suave na mudança de XP */
  }

  .current-xp-label {
    position: absolute;
    bottom: -15px; /* Posição abaixo da barra */
    color: var(--cor-secundaria);
    font-size: 13px;
    font-weight: 500;
    /* Centraliza o texto no pino de progresso */
    transform: translateX(-50%);
    transition: left 0.5s ease-in-out; /* Animação suave para acompanhar a barra */
  }
</style>
