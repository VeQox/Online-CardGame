<Navbar>
    <span slot="img" class="w-full">
        <a href="https://github.com/VeQox/Online-CardGame">
            <img class="h-12" src="/github.png" alt="github logo">
        </a>
    </span>    
    <span slot="col-2" class="w-full">
        <input bind:value={player.name} type="text" placeholder="Name" disabled={status != 0 ? true : undefined} class="h-8 rounded-md text-center w-full focus:outline-none disabled:bg-gray-300">
    </span>
    <span slot="col-3" class="w-full"> 
        <button disabled={status != 0 ? true : undefined} type="button" class="w-full h-8 rounded-md bg-white hover:cursor-pointer disabled:bg-gray-300 disabled:cursor-auto" on:click={connect}>
            {#if status == 0}
                Connect
            {:else if status == 1}
                Connecting
            {:else}
                Connected
            {/if}
        </button>
    </span>
</Navbar>

<Modal title="Waiting for Players" hidden={started || status != ConnectionStatus.Connected} loading={true}>
    <span slot="body">
        <p class="py-4">
           {readyCount}
        </p>
    </span>
    <span slot="footer">
        <button disabled={ready ? true : undefined}  type="button" class="my-1 px-2 py-1 mt-1 rounded-md disabled:bg-emerald-400 bg-red-400 border-2 border-gray-700 hover:cursor-pointer" on:click={setReady}>Ready</button>
    </span>
</Modal>


<script lang="ts">
    import "../app.css"
    import Navbar from "../components/navbar.svelte"
    import Modal from "../components/modal.svelte"
    import Player from "../Player"
    import Message from "../Message";
    import { ConnectionStatus } from "../Status"
    import Cards from "../components/cards.svelte"

    let status : ConnectionStatus = ConnectionStatus.Idle;
    let readyCount = "0 / 0";
    let started = false;
    let ready = false;
    let player : Player = new Player();
    let ws : WebSocket = {} as WebSocket;

    const connect = () => {
        ws = new WebSocket(`ws://localhost:8000/${player.name}`);
        status = ConnectionStatus.Connecting;
        ws.onopen = () => {
            status = ConnectionStatus.Connected;
        }
        ws.onerror = () => {
            status = ConnectionStatus.Idle;
        }
        ws.onmessage = (ev : MessageEvent) => {
            let message : Message = JSON.parse(ev.data);
            console.log(message);
            let head = message.head;
            let body = message.body;

            switch(head){
                case "updateReady":
                    readyCount = body
                    break;
            }
        }
    };
    const setReady = () => {
        ready = true;
        ws.send(new Message("setReady", "").toString());
    }
</script>