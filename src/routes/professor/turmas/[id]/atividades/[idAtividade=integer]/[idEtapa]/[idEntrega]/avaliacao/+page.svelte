<script>
	import Button from '$lib/components/Button.svelte';
	import InputText from '$lib/components/InputText.svelte';
	import IconeInformacao from '$lib/components/IconeInformacao.svelte';
	import InputNumber from '$lib/components/InputNumber.svelte';
	import { toast, Toaster } from 'svelte-sonner';
	import { enhance } from '$app/forms';
	import { ATRIBUICAO } from '$lib/constants.js';
	import Modal from '$lib/components/Modal.svelte';
	import { navigationGuard } from '$src/stores/navigationGuard.js';
	import { onDestroy, onMount } from 'svelte';

	let { data } = $props();

	let showModalCancelarAvaliacao = $state(false);
	let novoCriterioNota = $state('');
	let oldCriterioNota = $state('');
	let resolvePromise;

	function requestConfirmation() {
		showModalCancelarAvaliacao = true;
		return new Promise((resolve) => {
			resolvePromise = resolve;
		});
	}

	function formatarNota(valor) {
		let digitsOnly = String(valor).replace(/\D/g, '');

		if (!digitsOnly) {
			return '';
		}

		let formattedValue;

		if (digitsOnly.length >= 3 && digitsOnly.startsWith('100')) {
			formattedValue = '10.0';
		}
		else if (digitsOnly.length >= 2 && digitsOnly.startsWith('10')) {
			 formattedValue = '10';
		}
		else if (digitsOnly.length >= 2) {
			formattedValue = digitsOnly.charAt(0) + '.' + digitsOnly.substring(1, 2);
		}
		else {
			formattedValue = digitsOnly;
		}
		
		return formattedValue;
	}

	function onChangeCriterioNota() {
		novoCriterioNota = formatarNota(novoCriterioNota);

		if (parseFloat(novoCriterioNota) > 10.0 || novoCriterioNota === '0.0') {
			novoCriterioNota = oldCriterioNota;
		} else {
			oldCriterioNota = novoCriterioNota;
		}
	}

	onMount(() => {
		navigationGuard.set(requestConfirmation);
	});

	onDestroy(() => {
		navigationGuard.set(null);
	});

	// Funções chamadas pelos botões do modal
	function handleConfirm() {
		showModalCancelarAvaliacao = false;
		if (resolvePromise) {
			resolvePromise(true); // Confirma a navegação
		}
	}

	function handleCancel() {
		showModalCancelarAvaliacao = false;
		if (resolvePromise) {
			resolvePromise(false); // Cancela a navegação
		}
	}

	const notas = $state(
		data.entrega.notas.length != 0
			? data.entrega.notas.map((nota) => ({
					id_criterio: nota.id_criterio,
					nota: nota.nota_atribuida.toFixed(1)
				}))
			: data.etapa.criterios.map((c) => ({ id_criterio: c.id, nota: null }))
	);
	console.debug('notas => ', notas);

	function validarNotas() {
		const inputs = document.querySelectorAll('.input-container input');
		let todosPreenchidos = true;

		inputs.forEach((input, index) => {
			if (!input.value.trim()) {
				todosPreenchidos = false;
				notas[index].nota = null;
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
			notas[index].nota = valor;

			// Aguarda a próxima renderização para restaurar a posição do cursor
			setTimeout(() => {
				input.setSelectionRange(cursorPos, cursorPos);
			}, 0);
		}
	}

	function formatarNotaFinal(index, criterio) {
		const num = parseFloat(notas[index].num);
		if (!isNaN(num)) {
			notas[index].notas = Math.min(num, criterio.pontuacao_max).toFixed(1);
			notas[index].id_criterio = criterio.id;
		} else {
			notas[index].notas = 0.0;
			notas[index].id_criterio = criterio.id;
		}
	}

	let pontuacaoFinal = $derived.by(() => {
		if (data.etapa.tipo_atribuicao_nota == ATRIBUICAO.media_simples) {
			let pontuacaoFinal =
				notas.reduce((acc, n) => acc + (n.nota ? parseFloat(n.nota) : 0), 0) / notas.length;
			return pontuacaoFinal;
		} else {
			const somaPesos = data.etapa.criterios.reduce((acc, c) => acc + c.peso, 0);
			let somaNotasObtidas = 0;
			data.etapa.criterios.map((c, i) => {
				somaNotasObtidas += notas[i].nota * c.peso;
			});

			let pontuacaoFinal = somaNotasObtidas / somaPesos;
			return pontuacaoFinal;
		}
	});

	const grid_template_header =
		data.etapa.tipo_atribuicao_nota == ATRIBUICAO.media_ponderada
			? 'grid-template-columns: 0.9fr auto auto auto'
			: 'grid-template-columns: 1fr auto auto';

	const grid_template_body =
		data.etapa.tipo_atribuicao_nota == ATRIBUICAO.media_ponderada
			? 'grid-template-columns: 0.85fr auto auto auto'
			: 'grid-template-columns: 1fr auto auto';
</script>

<Modal
	visible={showModalCancelarAvaliacao}
	title="Atenção"
	message="Deseja realmente cancelar a avaliação da etapa? Todos os dados preenchidos serão perdidos."
	buttons={[
		{
			label: 'Sim, Cancelar',
			onClick: handleConfirm, // Chama a função que resolve a Promise com 'true'
			color: 'green'
		},
		{
			label: 'Não, Continuar',
			onClick: handleCancel, // Chama a função que resolve a Promise com 'false'
			color: 'red'
		}
	]}
/>
<Toaster richColors expand position="top-center" closeButton />
<div class="container">
	<p class="titulo-atividade">{data.atividade.titulo}</p>
	<p class="titulo-etapa">Etapa: {data.etapa.titulo}</p>
	{#if data.nomeEstudante != undefined}
		<p class="nome-estudante">Estudante: <b>{data.nomeEstudante}</b></p>
	{:else}
		<p class="nome-estudante">Grupo: <b>{data.nomeGrupo}</b></p>
	{/if}

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
					<InputNumber
						id="inputNotaMaxCriterio"
						borded
						name={criterio.titulo}
						width="80px"
						placeholder="Nota"
						oninput={() => onChangeCriterioNota(notas[index].nota, index)}
						bind:value={notas[index].nota}
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
				<Button type="submit" backgroundColor="var(--cor-primaria)" color="white"
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
