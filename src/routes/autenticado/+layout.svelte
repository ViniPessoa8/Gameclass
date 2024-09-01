<script>
	import Header from '$lib/components/Header.svelte';
	import SideBar from '$lib/components/SideBar.svelte';

	export let data;
</script>

<div class="turmas-container">
	<Header session={data} />
	<div class="content-container">
		<SideBar perfil={data.perfil} />
		<div class="content-page">
			<slot></slot>
		</div>
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

	.content-page {
		width: 100%;
		height: 100%;
		padding-top: 80px;
		overflow: auto;
		box-sizing: border-box;
	}
</style>
