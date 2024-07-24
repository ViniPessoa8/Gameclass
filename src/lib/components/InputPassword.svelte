<script>
    export let placeholder = ""; 
    export let value;
</script>

<input 
    class="input"
    type="password"
    placeholder={placeholder}
    bind:value={value}
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

    .input:focus {
        outline: none;
    }

    ::placeholder {
        color: var(--cor-secundaria);
    }
</style>