<script>
	import { Toaster, toast } from 'svelte-sonner';
	import TurmaTabBar from '$lib/components/TurmaTabBar.svelte';
	import { onMount } from 'svelte';

	export let data;

	const estudante = data.estudante;
	const turma = data.turma;
	const atividades = data.atividades;

	onMount(() => {
		for (let i = 0; i < atividades.length; i++) {
			if (atividades[i].itens_atividade.length == 0) {
				atividades[i].media_obtida = '-';
				atividades[i].media_max = '-';
			} else {
				atividades[i].media_obtida = (
					atividades[i].itens_atividade.reduce((acc, ia) => {
						if (ia.avaliacao.length == 0) return acc;

						const r =
							acc +
							ia.avaliacao?.reduce((acc2, a) => a.nota_atribuida + acc2, 0) / ia.avaliacao?.length;

						return r;
					}, 0) / atividades[i].itens_atividade.length
				).toFixed(1);

				atividades[i].media_max = (
					atividades[i].itens_atividade.reduce(
						(acc, ia) => acc + ia.criterios.reduce((acc2, c) => c.pontuacao_max + acc2, 0),
						0
					) / atividades[i].itens_atividade.length
				).toFixed(1);
			}
		}
	});
</script>

<Toaster richColors position="top-center" closeButton />
<div class="content-membro">
	<h1>Boletim do Aluno</h1>
	<div class="atividades">
		<div class="estudante-info">
			<div class="row">
				<p><b>{estudante.login}</b></p>
				<p>{estudante.nome}</p>
			</div>
			<p>{turma.nome} - {turma.disciplina}</p>
			<p>Posição no ranking da turma: <b>{estudante.posicao_ranking}</b></p>
		</div>
		<h1>Atividades</h1>
		<hr />
		<div class="atividades-container">
			{#each atividades as atividade}
				<div class="atividade">
					<h2>{atividade.titulo}</h2>
					<div class="row center">
						<p style="font-size: 18px">Média</p>
						<h3>{atividade.media_obtida}/{atividade.media_max}</h3>
					</div>
					<hr style="border-color: var(--cor-secundaria)" />
					{#each atividade.itens_atividade as itemAtividade, index}
						<div class="nota-item">
							<p style="font-size:18px"><u><b>{index + 1}. {itemAtividade.titulo}</b></u></p>
							<p style="font-size:18px">
								{#if itemAtividade.avaliacao.length != 0}
									<b
										>{itemAtividade.avaliacao?.reduce((acc, a) => a.nota_atribuida + acc, 0) /
											itemAtividade.avaliacao?.length}
									</b>
									/ {itemAtividade.criterios
										.reduce((acc, c) => c.pontuacao_max + acc, 0)
										.toFixed(1)}
								{:else}
									- / {itemAtividade.criterios
										.reduce((acc, c) => c.pontuacao_max + acc, 0)
										.toFixed(1)}
								{/if}
							</p>
						</div>
					{/each}
					{#if atividade.itens_atividade.length == 0}
						<p style="font-size:18px">(Não há itens cadastrados)</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<style scoped>
	.content-membro {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 24px;
		gap: 24px;
		padding: 24px 128px;
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 12px;
	}

	.center {
		justify-content: space-between;
		align-self: center;
	}

	.nota-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.estudante-info {
		font-size: 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		text-align: left;
		margin-right: auto;
		margin-bottom: 24px;
	}

	.atividades-container {
		display: flex;
		flex-direction: column;
		min-width: 600px;
	}

	.atividade {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		background-color: var(--cor-secundaria-1);
		border: 1px solid black;
		border-radius: 38px;
		padding: 18px;
		margin: 12px;
		text-align: center;
		gap: 12px;
	}

	hr {
		border: none;
		border-top: 1px solid var(--cor-secundaria);
	}
</style>
