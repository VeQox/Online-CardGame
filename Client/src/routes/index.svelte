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

<Modal title="Set Call" hidden={!getCall}>
    <span slot="body">
        <Cards cards={cards}/>
    </span>
    <span slot="footer">
        <div class="grid grid-cols-2 justify-center items-center mx-1">
            <input bind:value={call} class="h-8 rounded-md text-center w-full focus:outline-none disabled:bg-gray-300">
            <button disabled={ready ? true : undefined} on:click={setCall} type="button" class="my-1 py-1 mt-1 rounded-md disabled:bg-emerald-400 bg-red-400 border-2 hover:cursor-pointer">Confirm</button>
        </div>
    </span>
    
</Modal>

<Modal title="Select Card" hidden={!selectCard}>
    <span slot="body">
        <div class="grid grid-flow-col">
            {#each validCards as card}
            <div id={getIndexOf(card).toString()} class="hover:bg-gray-300" on:click={() => select(getIndexOf(card))}>
                <p>{card.type}</p>
                <p>{card.value}</p>
            </div>
            {/each}
        </div>
    </span>
    <span slot="footer">
        
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
    import type Card from "../../../Server/CardGame/Players/Cards/Card"

    let started = false;
    let ready = false;
    let getCall = false;
    let selectCard = false;

    let cards : Card[] = [];
    let validCards : Card[] = [];

    let player : Player = new Player();
    let ws : WebSocket = {} as WebSocket;

    let status : ConnectionStatus = ConnectionStatus.Idle;
    
    let readyCount = "0 / 0";
    let playerCount;

    const connect = () => {
        ws = new WebSocket(`ws://localhost:8000/${player.name}`);
        status = ConnectionStatus.Connecting;
        ws.onopen = () => {
            status = ConnectionStatus.Connected;
        }
        ws.onclose = () => {
            status = ConnectionStatus.Idle;
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
                    readyCount = body;
                    break;
                case "startGame":
                    started = true;
                    player.ID = body.ID;
                    playerCount = body.count;
                    break;
            }
        }

    };
    const setReady = () => {
        ready = true;
        ws.send(new Message("setReady", "").toString());
    };
    const select = (index : number) => {
        ws.send(new Message("selectCard", cards[index]).toString())
    };
    const getIndexOf = (card : {"type" : string, "value" : string}) => {
        return cards.findIndex(element => element.type == card.type && element.value == card.value);
    };
    let call : number;
    const setCall = () => {
        ws.send(new Message("setCall", call).toString())
    }  
</script>