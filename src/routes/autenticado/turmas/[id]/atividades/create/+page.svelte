<script>
	import InputText from '$lib/components/InputText.svelte';
	import InputTextArea from '$lib/components/InputTextArea.svelte';
	import InputDate from '$lib/components/InputDate.svelte';
	import InputRadio from '$lib/components/InputRadio.svelte';
	import IconeInformacao from '$lib/components/IconeInformacao.svelte';
</script>

<form class="cria-atividade-form">
	<h1>[Nome da turma]</h1>
	<h2>Criação de Atividade</h2>
	<!-- Titulo da Atividade -->
	<div class="row">
		<h3>Titulo da atividade:</h3>
		<InputText borded="true" />
	</div>
	<!-- Descrição -->
	<div class="row">
		<h3>Descrição:</h3>
		<InputTextArea borded="true" />
	</div>
	<!-- Prazo -->
	<div class="row">
		<h3>Prazo:</h3>
		<InputDate borded="true" />
	</div>
	<!-- Tags -->
	<!-- TODO: InputTag.svelte -->
	<div class="row">
		<h3>Tags:</h3>
		<InputText borded="true" />
	</div>
	<!-- Atribuição de Notas -->
	<div class="row">
		<h3>Atribuição de notas:</h3>
		<div class="column">
			<InputRadio
				options={[
					{
						name: 'media_simples',
						text: 'Média Simples'
					},
					{
						name: 'media_ponderada',
						text: 'Média Ponderada'
					}
				]}
			/>
		</div>
		<IconeInformacao text="Método de cálculo das notas dos alunos." />
	</div>
	<!-- Realização -->
	<div class="row">
		<h3>Realização:</h3>
		<div class="column">
			<InputRadio
				options={[
					{
						name: 'individual',
						text: 'Individual'
					},
					{
						name: 'grupos',
						text: 'Em Grupos'
					}
				]}
			/>
		</div>
		<IconeInformacao text="Forma em que os alunos irão realizar atividade." />
	</div>
	<!-- Receber após o prazo -->
	<div class="row">
		<InputRadio
			options={[
				{
					name: 'receber_pos_prazo',
					text: 'Receber após o prazo'
				}
			]}
		/>
		<IconeInformacao text="Receber a tarefa mesmo que o prazo final tenha passado." />
	</div>
</form>

<style>
	.cria-atividade-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 18px;
	}

	.row {
		font-size: 24px;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 12px;
	}

	.column {
		display: flex;
		flex-direction: column;
	}
</style>
