<div class="flex items-center justify-center h-screen backdrop-blur-none {hidden ? "hidden" : ""}">
    <div class="grid grid-rows bg-gray-200 pt-1 rounded-md shadow-xl shadow-gray-400 w-1/2">
        <div class="text-center py-1 {loading ? "" : "border-b-4 border-gray-600"}">
            {title}
        </div>
        <div class="border-b-4 border-gray-600 text-center">
            {#if loading}
            <p>
                <BarLoader size="25" unit="vw" color="#4b5563" duration="5s">
                </BarLoader>
            </p>
            {/if}
            <p class="py-4">
                {body}
            </p>
        </div>
        <div class="flex justify-center center-items py-1">
            <button disabled={ready ? true : undefined}  type="button" class="my-1 px-2 py-1 mt-1 rounded-md disabled:bg-emerald-400 bg-red-400 border-2 border-gray-700 hover:cursor-pointer" on:click={() => ready = true}>Ready</button>
        </div>
    </div>
</div>

<script lang="ts">
    import {BarLoader} from "svelte-loading-spinners";
    import Message from "../Message"
    export let hidden : boolean = false;
    export let title : string = "Modal Title";
    export let body : string = "Modal Body";
    export let loading : boolean = false;
    
    function setReady(ws : WebSocket){
        ws.send(new Message("setReady", "").toString());
    }

    let ready : boolean = false;
</script>