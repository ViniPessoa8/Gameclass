<script>
    export let onClick;
</script>

<button 
class="button"
on:click={onClick}
>
    <slot></slot>
</button>

<style>
    .button {
        background-color: var(--cor-fundo);
        border: none;
        height: 48px;
        font-size: 24px;
        font-family: var(--font);
        font-weight: bold;
        color: var(--cor-primaria);
        border-radius: 15px;
    }

    .button:hover {
        background-color: #A1A1A1;
        transition: .3s;
        cursor: pointer;
    }
</style>
