<script>
	import Button from '$lib/components/Button.svelte';
	import InputText from '$lib/components/InputText.svelte';
	import IconeInformacao from '$lib/components/IconeInformacao.svelte';
	import { toast, Toaster } from 'svelte-sonner';
	import { enhance } from '$app/forms';
	import { ATRIBUICAO } from '$lib/constants.js';

	export let data;

	const notas =
		data.entrega.notas.length != 0
			? data.entrega.notas.map((notas) => notas.nota_atribuida.toFixed(1))
			: Array(data.etapa.criterios.length).fill('');

	function validarNotas() {
		const inputs = document.querySelectorAll('.input-container input');
		let todosPreenchidos = true;

		inputs.forEach((input, index) => {
			if (!input.value.trim()) {
				todosPreenchidos = false;
				notas[index] = null;
			}
		});

		if (!todosPreenchidos) {
			toast.error('Preencha a nota de todos os critérios para finalizar a avaliação.');
			return false;
		}

		return true;
	}

	function formatarNota(valor, index, event) {
		let input = event.target;
		let cursorPos = input.selectionStart;

		if (String(valor).includes(',')) {
			valor = valor.replace(',', '.');
			cursorPos++;
		}

		// Permitir números no formato "X" ou "X.Y" com até 2 dígitos antes do ponto
		if (/^\d{0,2}(\.\d{0,1})?$/.test(valor) || valor === '') {
			notas[index] = valor;

			// Aguarda a próxima renderização para restaurar a posição do cursor
			setTimeout(() => {
				input.setSelectionRange(cursorPos, cursorPos);
			}, 0);
		}
	}

	function formatarNotaFinal(index, max) {
		const num = parseFloat(notas[index]);
		if (!isNaN(num)) {
			notas[index] = Math.min(num, max).toFixed(1);
		} else {
			notas[index] = '';
		}
	}

	function finalizarAvaliacao() {
		if (validarNotas()) {
		}
	}

	let pontuacaoFinal = 0;
	$: {
		if (data.etapa.tipo_atribuicao_nota == ATRIBUICAO.media_simples) {
			pontuacaoFinal = notas.reduce((acc, n) => acc + (n ? parseFloat(n) : 0), 0) / notas.length;
		} else {
			const somaPesos = data.etapa.criterios.reduce((acc, c) => acc + c.peso, 0);
			let somaNotasObtidas = 0;
			data.etapa.criterios.map((c, i) => {
				somaNotasObtidas += notas[i] * c.peso;
			});

			pontuacaoFinal = somaNotasObtidas / somaPesos;
		}
	}

	const grid_template_header =
		data.etapa.tipo_atribuicao_nota == ATRIBUICAO.media_ponderada
			? 'grid-template-columns: 0.9fr auto auto auto'
			: 'grid-template-columns: 1fr auto auto';

	const grid_template_body =
		data.etapa.tipo_atribuicao_nota == ATRIBUICAO.media_ponderada
			? 'grid-template-columns: 0.85fr auto auto auto'
			: 'grid-template-columns: 1fr auto auto';
</script>

<Toaster richColors expand position="top-center" closeButton />
<div class="container">
	<p class="titulo-atividade">{data.atividade.titulo}</p>
	<p class="titulo-etapa">Etapa: {data.etapa.titulo}</p>
	<p class="nome-estudante">Estudante: <b>{data.nomeEstudante}</b></p>

	<form
		class="criterios-grid"
		method="POST"
		style={grid_template_body}
		action={data.entrega.notas.length != 0 ? '?/alterar' : '?/criar'}
		use:enhance={({ cancel }) => {
			if (!validarNotas()) {
				cancel();
			}

			return async ({ update }) => {
				await update();
			};
		}}
	>
		<h1>Critérios</h1>
		<div class="grid-header" style={grid_template_header}>
			<p class="header-titulo">Título</p>
			<p class="header-nota">Nota Obtida</p>
			<p class="header-max">Nota Max</p>
			{#if data.etapa.tipo_atribuicao_nota == ATRIBUICAO.media_ponderada}
				<p class="header-peso">Peso</p>
			{/if}
		</div>

		{#each data.etapa.criterios as criterio, index}
			<div class="grid-row">
				<div class="criterio-titulo-descricao">
					<p class="criterio-titulo">{criterio.titulo}</p>
					<IconeInformacao text={criterio.descricao} />
				</div>
				<div class="input-container">
					<InputText
						borded
						name={criterio.titulo}
						placeholder="Nota"
						width="80px"
						bind:value={notas[index]}
						inputHandler={(e) => formatarNota(notas[index], index, e)}
						on:blur={() => formatarNotaFinal(index, criterio.pontuacao_max)}
						step="0.1"
						min="0"
						max="10"
					/>
				</div>
				<div class="nota-max">
					<p>{criterio.pontuacao_max.toFixed(1)}</p>
				</div>
				{#if data.etapa.tipo_atribuicao_nota == ATRIBUICAO.media_ponderada}
					<div class="peso">
						<p>{criterio.peso.toFixed(0)}</p>
					</div>
				{/if}
			</div>
		{/each}

		<div class="btn-container">
			<div class="pontuacao-final">
				<h2>Média final: {pontuacaoFinal.toFixed(1)}</h2>
			</div>
			<div class="btn-finalizar">
				<Button on:click={finalizarAvaliacao} backgroundColor="var(--cor-primaria)" color="white"
					>{data.entrega.notas.length == 0 ? 'Finalizar Avaliação' : 'Editar Avaliação'}</Button
				>
			</div>
		</div>
	</form>
</div>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}

	.titulo-atividade {
		font-size: 36px;
		font-weight: 600;
		margin: 24px 0 8px;
	}

	.titulo-etapa {
		font-size: 28px;
		font-weight: 500;
		margin-bottom: 8px;
	}

	.nome-estudante {
		font-size: 28px;
		font-weight: 500;
		margin: 24px 0;
	}

	.criterios-grid {
		width: 80%;
		display: grid;
		grid-template-columns: 1fr auto auto;
		gap: 16px;
		margin-top: 32px;
	}

	.criterios-grid > h1 {
		grid-column: 1 / -1;
		font-size: 24px;
		margin-bottom: 16px;
	}

	.grid-header {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: 1fr auto auto;
		gap: 16px;
		font-weight: bold;
		border-bottom: 2px solid #ddd;
		padding-bottom: 8px;
	}

	/* Alinhamento dos headers */
	.header-titulo {
		font-weight: 600;
		text-align: left;
		padding-left: 8px;
	}

	.header-nota,
	.header-max {
		font-weight: 600;
		text-align: center;
		width: 100px; /* Largura fixa para alinhar com os inputs */
	}

	.grid-row {
		display: contents;
	}

	.grid-row > * {
		padding: 12px 0;
		border-bottom: 1px solid #eee;
		display: flex;
		align-items: center;
		text-align: center;
	}

	.criterio-titulo {
		font-size: 20px;
		font-weight: 500;
		padding-left: 8px;
		min-width: 126px;
		max-width: 250px;
		word-break: break-word;
		white-space: normal;
	}

	.criterio-titulo-descricao {
		display: flex;
	}

	.input-container {
		display: flex;
		justify-content: center;
		width: 150px; /* Mesma largura do header */
		margin: 0 auto;
	}

	.nota-max,
	.peso {
		justify-content: center;
		font-weight: bold;
		font-size: 24px;
		width: 50px; /* Mesma largura do header */
	}

	.btn-container {
		grid-column: 1 / -1;
		margin-top: 40px;
	}

	.pontuacao-final {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.btn-finalizar {
		display: flex;
		justify-content: center;
		margin-top: 12px;
	}
</style>
