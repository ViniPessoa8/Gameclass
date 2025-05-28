<script>
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
</script>

<div class="content-container">
	<h1><u>Definir formação de grupos</u></h1>
	<h2>{data.atividade.titulo}</h2>
	<p style="margin-top: 48px; font-weight: 500;">
		Defina de que forma os grupos de alunos serão formados
	</p>
	<div style="margin-top: 48px;" class="botoes-container">
		<Button backgroundColor="var(--cor-primaria)" color="white"
			>Os alunos criam e convidam seus amigos</Button
		>
		<Button disabled>Quero escolher os grupos <br />(em desenvolvimento)</Button>
		<Button backgroundColor="var(--cor-primaria)" color="white">Gerar grupos aleatórios</Button>
	</div>
</div>

<style scoped>
	.content-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 24px;
		gap: 8px;
	}

	.botoes-container {
		display: flex;
		flex-direction: column;
		max-width: 380px;
		height: 300px;
		gap: 48px;
	}
</style>
