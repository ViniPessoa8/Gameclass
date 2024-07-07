<script>
    export let color, text = "";
</script>

<div class="icon" style="background-color: {color}">
    <h1 class="info">
        <slot>{text}</slot>
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