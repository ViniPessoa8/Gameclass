<script>
    import {COLORS} from "../constants"
    import Button from "./Button.svelte"
    import SideBarButton from "./SideBarButton.svelte"
	import SideBarTurma from "./SideBarTurma.svelte";
</script>

<div class="sidebar" style="background-color: {COLORS.cor_primaria_1};">
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
        backgroundColor={COLORS.cor_primaria_1}
        onClick={() => {console.log("teste")}}
    >
        + Adicionar Turma
    </Button>
</div>

<style>
    .sidebar {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100%;
        min-width: 324px;
        padding-top: 80px;
    }
    
    .buttons {
        display: flex;
        margin-bottom: 84px;
    }

    .turma {
        color:white;
        margin-bottom: 32px;
    }

</style>