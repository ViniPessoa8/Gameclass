<script>
	import CircularTextIcon from "./CircularTextIcon.svelte";
    import Button from "./Button.svelte"
    import SideBarButton from "./SideBarButton.svelte"
	import SideBarTurma from "./SideBarTurma.svelte";
</script>

<div class="sidebar">
    <div class="buttons">
        <SideBarButton img={"home"}>Home</SideBarButton>
        <SideBarButton img={"logout"}>Logout</SideBarButton>
    </div>

    <div class="turmas">
        <div class="turma">
            <SideBarTurma acronym="CA" color={"red"}>Calculados - 2023</SideBarTurma>
            <SideBarTurma acronym="AE" color={"green"}>AED 1 - 2023</SideBarTurma>
            <SideBarTurma acronym="ES" color={"black"}>Eng. de Soft. - 2023</SideBarTurma>
        </div>
    </div>

    <Button 
        backgroundColor={document.body.style.getPropertyValue("--cor-secundaria")}
        onClick={() => {console.log(document.body.style.getPropertyValue("--cor-secundaria"))}}
    >
        + Adicionar Turma
    </Button>
</div>

<style>
    .buttons {
        display: flex;
        margin-bottom: 84px;
    }

    .turma {
        color:white;
        margin-bottom: 32px;
    }

    .sidebar {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        height: 100%;
        width: 324px;
        background-color: var(--cor-primaria);
    }
</style>