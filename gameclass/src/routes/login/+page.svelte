<script>
	import Button from "$lib/components/Button.svelte";
	import InputText from "$lib/components/InputText.svelte";
	import InputPassword from "../../lib/components/InputPassword.svelte";
    import registerNewUser from "$controllers/auth.js"

    import {login} from "$lib/controller/auth"

    let userLogin = "";
    let userPassword = "";

    function aoLogar() {
        login(userLogin, userPassword);
        // login("teste", 2);
    }

    function aoCriarConta() {
        registerNewUser()
    }
</script>
<div class="login-container">
    <h1>Bem vindo(a) ao <b>Gameclass</b></h1>
    <span>Sua plataforma online de aprendizado gamificado</span>
    <div class="card-container">
        <InputText bind:value={userLogin} placeholder="Nome de usuário / E-mail"/>
        <InputPassword bind:value={userPassword} type="password" placeholder="Senha"/>
        <br>
        <Button onClick={aoLogar}>Login</Button>
        <Button onClick={aoCriarConta}>Criar Conta</Button>
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
        font-size: 48px;
        /* font-weight: lighter; */
    }
    
    span {
        margin-top: 18px;
        font-size: 30px;
    }

    .card-container {
        display: flex;
        flex-direction: column;
        background-color: var(--cor-primaria);
        width: 439px;
        padding-right: 42px;
        padding-left: 42px;
        padding-top: 84px;
        padding-bottom: 84px;
        margin-top: 75px;
        border-radius: 15px;
        gap: 36px;
    }

</style>
