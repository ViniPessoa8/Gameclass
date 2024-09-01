<script>
	import Header from '$lib/components/Header.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';

	export let data;
	let previousPage;
	const BACK_SKIP = ['/autenticado/turmas'];

	onMount(() => {
		console.log('onMount() $page.url.pathname:', $page.url.pathname);
	});

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	function onBack() {
		console.log('onBack() previousPage:', previousPage);
		if (previousPage) {
			goto(previousPage);
		}
	}
</script>

<div class="turmas-container">
	<Header session={data} />
	<div class="content-container">
		<SideBar perfil={data.perfil} />
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
