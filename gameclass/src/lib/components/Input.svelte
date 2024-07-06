<script>
    export let type = "";
    export let placeholder = ""; 
</script>

<input 
    class="input"
    type={type}
    placeholder={placeholder}
/>

<style>
    .input {
        border:none;
        font-family: var(--font);
        border-bottom: 1px solid var(--cor-secundaria);
        background-color: transparent;
        color: var(--text-1);
        font-size: 24px;
    }

    ::placeholder {
        color: var(--cor-secundaria);
    }
</style>