<script>

	import CircularTextIcon from "./CircularTextIcon.svelte";

</script>
<div class="header">
    <h3>Gamiclass > Turmas</h3>
    <div class="logged-user">
        <div class="info">
            <h4 class="logged-user-name">Eduardo Fonseca</h4>
            <p class="logged-user-role">Professor</p>
        </div>
        <CircularTextIcon backgroundColor={"#FF00FF"}>E</CircularTextIcon>
    </div>
</div>

<style>
    .header {
        background-color: var(--cor-primaria);
        display: flex;
        color: white;
        justify-content: space-between;
        align-items: center;
        padding:10px;
        z-index: 1;
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 20px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .logged-user {
        display: flex;
        gap: 10px;
        text-align: end;
    }

    .logged-user-name {
        font-size: 22px;
    }

    .logged-user-role {
        font-size: 16px;
        color: var(--cor-secundaria);
        font-weight: bolder;
    }
</style>