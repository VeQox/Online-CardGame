<script lang="ts">
    type Card = {"type": string, "value": string}
    export let cards : Card[];
    
    
</script>

<div class="grid grid-flow-col">
    {#each cards as card}
    <div>
        <p>
            {card.type} 
        </p>
        <p>
            {card.value}
        </p>
    </div>
    {/each}
</div>