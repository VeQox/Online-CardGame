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
            <slot name="body">

            </slot>
        </div>
        <div class="flex justify-center center-items py-1">
            <slot name="footer">

            </slot>            
        </div>
    </div>
</div>

<script lang="ts">
    import {BarLoader} from "svelte-loading-spinners";
    export let hidden : boolean = false;
    export let title : string = "Modal Title";
    export let loading : boolean = false;
</script>