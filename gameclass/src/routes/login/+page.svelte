<script>
	import Button from "$lib/components/Button.svelte";

</script>
<div class="login-container">
    <h1>Bem vindo(a) ao <b>Gameclass</b></h1>
    <span>Sua plataforma online de aprendizado gamificado</span>
    <div class="card-container">
        <input type="text"/>
        <input type="password"/>
        <Button>Login</Button>
        <Button>Criar Conta</Button>
    </div>
</div>

<style>
    .login-container{
        height: 100%;
        font: var(--font);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    h1 {
        margin-top: 6rem;
        font-size: 64px;
        /* font-weight: lighter; */
    }
    
    span {
        margin-top: 18px;
        font-size: 36px;
    }

    .card-container {
        display: flex;
        flex-direction: column;
        background-color: var(--cor-primaria);
        width: 439px;
        padding: 42px;
        margin-top: 75px;
        border-radius: 15px;
        gap: 24px;
    }

</style>
