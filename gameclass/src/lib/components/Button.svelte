<button class="button">
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
</style>
