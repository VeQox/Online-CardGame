<script>
	import Modal from "./Modal.svelte"
	import Message from "./Message.js";

	const protocol = "ws";
	const url = "localhost";
	const port = 8000;

	let name;
	let points;

	let showModal = false;
	let ReadyCount = "";
	let readyState = -1;

	let ws;

	function Connect(){
		ws = new WebSocket(`${protocol}://${url}:${port}/${name}`);
		readyState = 0;
		ws.onopen = () => {
			readyState = 1;
			showModal = true;
		}
		ws.onerror = () => {
			readyState = -1;
		}
		ws.onmessage = (ev) => {
			console.log(ev.data);
			let data = JSON.parse(ev.data);

			switch (data._head) {
				case "updateReady":
					ReadyCount = data._body;
					break;
			}
		}
	}

	function setReady(){
		ws.send(new Message("setReady", ""))
	}
</script>

<nav class="navbar navbar-light bg-light">
	<div class="container-fluid">
		<a href="https://github.com/VeQox/Online-CardGame">
			<img class="mx-2" src="github.png" alt="github logo">
		</a>
		<form class="d-flex align-items-center">
			<input class="form-control m-1 text-center" placeholder="Points" disabled bind:value={points}>	
			{#if readyState == -1}
				<input class="formt-control text-center rounded-2 m-1" placeholder="Name" bind:value={name}>
				<button class="btn btn-outline-success m-1 d-flex align-items-center w-auto" type="button" on:click={Connect} >	
					{#if readyState == 0 } 
						<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
						<span class="m-2">
							Connecting...
						</span>
					{:else if readyState == 1}
						Connected
					{:else}
						Connect
					{/if}
				</button>
			{:else}
				<input class="formt-control text-center rounded-2 mx-1" disabled placeholder="Name" bind:value={name}>
				<button class="btn btn-outline-success mx-1 d-flex align-items-center w-auto" disabled type="button" on:click={Connect} >	
					{#if readyState == 0 } 
						<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
						<span class="mx-2">
							Connecting...
						</span>
					{:else if readyState == 1}
						Connected
					{:else}
						Connect
					{/if}
				</button>
			{/if}
			
		</form>
	</div>
</nav>
<Modal title="Waiting for Players" open={showModal} setReady={setReady}>
	<div class="text-center">
		<span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"/>
		<p>
			{ReadyCount}
		</p>
	</div>
	<div class="modal-footer d-flex justify-content-center">
		<button type="button" class="btn btn-success" on:click={setReady}>Ready</button>
	</div>
</Modal>

<style>
	img {
		height: 2.5rem;
	}
	.btn:focus {
		outline: none;
		box-shadow: none;
	}
</style>