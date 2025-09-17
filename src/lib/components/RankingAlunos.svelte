<script>
	import AlunoRanking from './AlunoRanking.svelte';

	let { listaAlunos, idEstudante, idTurma } = $props();
</script>

<div class="container">
	<div class="ranking">
		<p class="titulo"><b>Ranking de Alunos - {listaAlunos.length}</b></p>
		<hr />
		<div class="estudante top-3">
			{#each listaAlunos.slice(0, 3) as pontoAluno, index}
				<AlunoRanking
					login={pontoAluno.login}
					nome={pontoAluno.nome}
					email={pontoAluno.email}
					pontos={pontoAluno.pontos}
					posicao={index + 1}
					cor={'#' + pontoAluno.cor}
					idEstudante={pontoAluno.id}
					{idTurma}
				/>
			{/each}
		</div>
		<hr />
		<div class="estudante other-ranking">
			{#each listaAlunos.slice(3) as pontoAluno, index}
				<AlunoRanking
					login={pontoAluno.login}
					nome={pontoAluno.nome}
					email={pontoAluno.email}
					pontos={pontoAluno.pontos}
					posicao={index + 4}
					cor={'#' + pontoAluno.cor}
					idEstudante={pontoAluno.id}
					{idTurma}
				/>
			{/each}
		</div>
	</div>
</div>

<style scoped>
	.container {
		float: right;
		background-color: var(--cor-secundaria);
		width: 300px;
		overflow-y: auto;
	}

	.ranking {
		box-sizing: border-box;
	}

	.titulo {
		font-size: 24px;
		text-align: center;
		padding: 24px 0px;
	}

	.estudante {
		box-sizing: border-box;
		width: 95%;
	}
</style>
