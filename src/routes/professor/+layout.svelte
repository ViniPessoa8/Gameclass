<script>
	import '../../static/app.css';
	import Header from '$lib/components/Header.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';

	export let data;
	let previousPage;
	let voltarPara;
	const BACK_SKIP = [`/${data.perfil}/turmas`];

	$: voltarPara = $page.data.voltarPara;

	onMount(() => {
		console.log('onMount() $page.url.pathname:', $page.url.pathname);
	});

	function onBack() {
		if (voltarPara) {
			goto(voltarPara);
		} else {
			const partes = $page.url.pathname.split('/');
			partes.pop();
			goto(partes.join('/'));
		}
	}
</script>

<div class="turmas-container">
	<Header session={data} />
	<div class="content-container">
		<SideBar perfil={data.perfil} turmas={data.turmas} />
		<div class="content-page">
			<!-- TODO: melhorar design do botão -->
			{#if !BACK_SKIP.includes($page.url.pathname)}
				<div class="button-container">
					<Button backgroundColor="var(--cor-primaria)" color="white" on:click={onBack}
						>{'<-'}</Button
					>
				</div>
			{/if}
			<slot></slot>
		</div>
	</div>
</div>

<style>
	.button-container {
		position: absolute;
		margin: 20px;
	}

	.turmas-container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.content-container {
		display: flex;
		flex-direction: row;
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.content-page {
		width: 100%;
		height: 100%;
		padding-top: 80px;
		overflow: auto;
		box-sizing: border-box;
	}
</style>
