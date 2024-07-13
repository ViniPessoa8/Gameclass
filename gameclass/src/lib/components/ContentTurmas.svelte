<script>
    import Turma from "./Turma.svelte";
</script>

<div class="content-turmas">
    <h1>Suas Turmas</h1>
    <div class="turmas-container">
        <Turma titulo="Calculados" disciplina="Cálculo" ano=2023 nEstudantes=45/>
    </div>
</div>

<style>
    .content-turmas {
        margin-top: 110px;
        width: 100%;
        height: 100%;
    }

    .content-turmas > h1 {
        size: 26px;
        text-align: center;
    }

    .turmas-container {
        margin-left: 94px;
        margin-top: 30px;
    }

</style>