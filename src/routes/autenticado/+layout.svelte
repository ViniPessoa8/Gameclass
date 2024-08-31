<script>
	import Header from '$lib/components/Header.svelte';
	import SideBar from '$lib/components/SideBar.svelte';

	export let data;
	console.log('autenticado/layout/ data=', data);
</script>

<div class="turmas-container">
	<Header session={data} />
	<div class="content-container">
		<SideBar perfil={data.perfil} />
		<slot></slot>
	</div>
</div>

<style>
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
</style>
