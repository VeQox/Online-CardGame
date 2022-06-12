<script>
    import { fade, fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
  
    export let open = false;
    export let showBackdrop = true;
    export let title = 'Modal title';
  
  </script>
  
  {#if open}
    <div class="modal" id="sampleModal" tabindex="-1" role="dialog" aria-labelledby="sampleModalLabel" aria-hidden={false}>
      <div class="modal-dialog" role="document" in:fly={{ y: -50, duration: 300 }} out:fly={{ y: -50, duration: 300, easing: quintOut }}>
        <div class="modal-content">
          <div class="modal-header d-flex justify-content-center">
            <h5 class="modal-title" id="sampleModalLabel">{title}</h5>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
    {#if showBackdrop}
      <div class="modal-backdrop show" transition:fade={{ duration: 150 }} />
    {/if}
  {/if}
  
  <style>
    .modal {
      display: block;
    }
  </style>