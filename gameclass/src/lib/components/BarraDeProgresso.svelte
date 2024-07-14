<script>
	import { COLORS } from "../constants";

    // input[0] > input[1] > input[2] > ....
    let input = [1, 3, 5]
    let barra_width = 390
    let input_step = barra_width / input.length;

    // Colors
    const colors = [
        COLORS.cor_secundaria_1, 
        COLORS.cor_secundaria_2, 
        COLORS.cor_secundaria_3
    ]

    console.log(`input.length: ${input.length}`);
    console.log("input_step: " + input_step);
</script>

<div class="barra-container">
    {#each input as num, index}
        <div 
            class="barra-container barra-progresso"
            style:width="{(index + 1) * input_step}px"
            style:background-color="{colors[index]}"
            style:z-index={100 - index}
        >
            {num}
        </div>
    {/each}
</div>

<style>
    .barra-container {
        width: 390px;
        height: 24px;
        border-radius: 40px;
    }

    .barra-progresso {
        border-radius: 40px;
        position: absolute;
        text-align: end;
        display: flex;
        flex-direction: row;
        justify-content: end;
        box-sizing: border-box;
        padding-right: 8.65px;

    }
</style>