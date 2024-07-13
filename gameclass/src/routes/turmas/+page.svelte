<script>
	import Header from "../../lib/components/Header.svelte";
	import SideBar from "../../lib/components/SideBar.svelte";
	import ContentTurmas from "../../lib/components/ContentTurmas.svelte";
	import { COLORS } from "../../lib/constants";

</script>
<div class="turmas-container">
	<Header />
	<div class="content-container">
		<SideBar />
		<ContentTurmas />
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

