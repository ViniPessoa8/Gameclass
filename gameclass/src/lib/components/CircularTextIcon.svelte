<script>
    export let color = "white";
    export let backgroundColor = getComputedStyle(document.body).getPropertyValue("--cor-primaria");
</script>

<div class="icon" style="background-color: {backgroundColor}; color: {color}">
    <h1 class="info">
        <slot></slot>
    </h1>
</div>

<style>
    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        width: 60px;
        border-radius: 100%;
    }

    .icon > .info {
        text-align: center;
        justify-self: center;
    }
</style>