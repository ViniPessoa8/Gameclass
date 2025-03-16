<script>
	import AlunoRanking from './AlunoRanking.svelte';

	export let listaAlunos;
</script>

<div class="container">
	<div class="ranking">
		<p class="titulo"><b>Ranking de Alunos - {listaAlunos.length}</b></p>
		<hr />
		<div class="top-3">
			{#each listaAlunos.slice(0, 3) as pontoAluno, index}
				<AlunoRanking
					nome={pontoAluno.nome}
					pontos={pontoAluno.pontos}
					posicao={index + 1}
					cor={'#' + pontoAluno.cor}
				/>
			{/each}
		</div>
		<hr />
		<div class="other-ranking">
			{#each listaAlunos.slice(3) as pontoAluno, index}
				<AlunoRanking
					nome={pontoAluno.nome}
					pontos={pontoAluno.pontos}
					posicao={index + 4}
					cor={'#' + pontoAluno.cor}
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
