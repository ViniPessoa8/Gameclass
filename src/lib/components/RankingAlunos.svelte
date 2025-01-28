<script>
	import AlunoRanking from './AlunoRanking.svelte';

	export const pontosPorAluno = [
		{
			nome: 'Vinícius Pessoa',
			pontos: 120,
			cor: 'red'
		},
		{
			nome: 'João Gabriel',
			pontos: 130,
			cor: 'green'
		},
		{
			nome: 'Lucas Bezerra',
			pontos: 90,
			cor: 'blue'
		},
		{
			nome: 'Pedro Henrique',
			pontos: 95,
			cor: 'cyan'
		}
	].sort(comparaPontos);

	function comparaPontos(a, b) {
		if (a.pontos < b.pontos) {
			return 1;
		}
		if (a.pontos > b.pontos) {
			return -1;
		}
		return 0;
	}
</script>

<div class="container">
	<div class="ranking">
		<p class="titulo"><b>Ranking de Alunos - {pontosPorAluno.length}</b></p>
		<hr />
		<div class="top-3">
			{#each pontosPorAluno.slice(0, 3) as pontoAluno, index}
				<AlunoRanking
					nome={pontoAluno.nome}
					pontos={pontoAluno.pontos}
					posicao={index + 1}
					cor={pontoAluno.cor}
				/>
			{/each}
		</div>
		<hr />
		<div class="other-ranking">
			{#each pontosPorAluno.slice(3) as pontoAluno, index}
				<AlunoRanking
					nome={pontoAluno.nome}
					pontos={pontoAluno.pontos}
					posicao={index + 4}
					cor={pontoAluno.cor}
				/>
			{/each}
		</div>
	</div>
</div>

<style>
	.container {
		margin-top: -24px;
		float: right;
		background-color: var(--cor-secundaria);
		width: 325px;
		height: 1000px;
	}

	.titulo {
		font-size: 24px;
		text-align: center;
		padding: 24px 0px;
	}
</style>
