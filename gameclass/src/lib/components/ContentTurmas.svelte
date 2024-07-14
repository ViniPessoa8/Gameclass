<script>
    import Turma from "./Turma.svelte";

    let turmas = [{
        nome:"Calculados", 
        disciplina:"Cálculo I",
        ano: 2024,
        estudantes: 35
    },{
        nome:"AED 1", 
        disciplina:"Algoritmo e Estrutura de Dados I",
        ano: 2024,
        estudantes: 31
    },{
        nome:"Eng. de Soft. - 2023", 
        disciplina:"Engenharia de Software",
        ano: 2023,
        estudantes: 20
    }
    ]
</script>

<div class="content-turmas">
    <h1>Suas Turmas</h1>
    <div class="turmas-container">
        {#each turmas as turma}
            <Turma 
                titulo={turma.nome} 
                disciplina={turma.disciplina}
                ano={turma.ano} 
                nEstudantes={turma.estudantes}
            />
        {/each}
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
        display: flex;
        flex-wrap: wrap;
        gap: 60px;
    }

</style>