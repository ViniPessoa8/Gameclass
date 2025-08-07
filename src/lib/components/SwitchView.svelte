<script>
	import { createEventDispatcher, onMount } from 'svelte';

	/**
	 * Define a visualização inicial. Pode ser 'lista' ou 'grade'.
	 * @type {'lista' | 'grade'}
	 */
	export let view = 'grade';
	export let size = 30;

	const dispatch = createEventDispatcher();

	async function selectView(newView) {
		if (view !== newView) {
			view = newView;
			// Dispara um evento 'change' com o novo valor
			dispatch('change', { value: view });
		}

		// Envia o novo valor para o backend
		try {
			const response = await fetch('/api/set-cookie', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ newView: view })
			});

			if (!response.ok) {
				throw new Error('Falha ao salvar o cookie');
			}
			console.log('Cookie salvo com sucesso!');
		} catch (error) {
			console.error('Erro ao enviar o valor para o servidor:', error);
		}
	}
</script>

<div class="switch-container" role="radiogroup" aria-label="Seletor de visualização">
	<button
		role="radio"
		aria-checked={view === 'lista'}
		class="option"
		class:active={view === 'lista'}
		on:click={() => selectView('lista')}
	>
		Lista
	</button>
	<button
		role="radio"
		aria-checked={view === 'grade'}
		class="option"
		class:active={view === 'grade'}
		on:click={() => selectView('grade')}
	>
		Grade
	</button>
</div>

<style>
	.switch-container {
		display: inline-flex;
		align-items: center;
		padding: 6px;
		background-color: #2d2d30; /* Cinza escuro do fundo */
		border-radius: 999px; /* Bordas totalmente arredondadas */
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
		border: 1px solid #4a4a4a;
	}

	.option {
		border: none;
		background-color: transparent;
		cursor: pointer;
		padding: 6px 25px;
		margin: 0;
		border-radius: 999px;
		font-size: 20px;
		font-weight: 400; /* Peso da fonte */
		color: #cccccc; /* Cor do texto inativo */
		line-height: 1;
		/* Transição suave para cores e fundo */
		transition:
			background-color 0.3s ease-in-out,
			color 0.3s ease-in-out;
	}

	.option.active {
		background-color: #0d47a1; /* Azul vibrante do botão ativo */
		color: #ffffff; /* Texto branco para a opção ativa */
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); /* Sombra suave para dar profundidade */
	}
</style>
