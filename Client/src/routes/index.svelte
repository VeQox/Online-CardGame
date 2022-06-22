<Navbar>
    <div class="col flex justify-start">
        <a href="https://github.com/VeQox/Online-CardGame">
            <img class="h-12" src="/github.png" alt="github logo">
        </a>
    </div>
    <div class="col flex items-center px-1">
        <input type="text" placeholder="Name" disabled={readystate != 0 ? true : undefined} class="h-8 rounded-md text-center w-full focus:outline-none disabled:bg-gray-200">
    </div>
    <div class="col flex items-center px-1">
        <button disabled={readystate != 0 ? true : undefined} type="button" class="w-full h-8 rounded-md bg-white hover:cursor-pointer disabled:bg-gray-200 disabled:cursor-auto" on:click={connect}>
            {#if readystate == 0}
                Connect
            {:else if readystate == 1}
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
    //import WebSocket from "ws";
    
    // 0 -> Idle, 1 -> Connecting, 2 -> Connected
    let readystate : number = 0;

    const connect = () => {
        readystate = 1;
    };
</script>