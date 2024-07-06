<script>

</script>

<button class="button">
    <slot></slot>
</button>

<style>
    .button {
        background-color: var(--cor-fundo);
        border: none;
        text-align: center;
        height: 52px;
        font-size: 28px;
        font-family: var(--font);
        font-weight: bold;
        color: var(--cor-primaria);
        border-radius: 15px;
    }
</style>
