<Navbar>
    <div class="col flex justify-start">
        <a href="https://github.com/VeQox/Online-CardGame">
            <img class="h-12" src="/github.png" alt="github logo">
        </a>
    </div>
    <div class="col flex items-center px-1">
        <input bind:value={player.name} type="text" placeholder="Name" disabled={player.connectionStatus != 0 ? true : undefined} class="h-8 rounded-md text-center w-full focus:outline-none disabled:bg-gray-200">
    </div>
    <div class="col flex items-center px-1">
        <button disabled={player.connectionStatus != 0 ? true : undefined} type="button" class="w-full h-8 rounded-md bg-white hover:cursor-pointer disabled:bg-gray-200 disabled:cursor-auto" on:click={connect}>
            {#if player.connectionStatus == 0}
                Connect
            {:else if player.connectionStatus == 1}
                Connecting
            {:else}
                Connected
            {/if}
        </button>
    </div>
</Navbar>

<Modal/>

<script lang="ts">
    import "../app.css"
    import Navbar from "../components/navbar.svelte"
    import Modal from "../components/modal.svelte"
    import Player from "../Player"

    let player : Player = new Player();

    const connect = () => {
        player.connect("ws://localhost:8000/");
    };
</script>