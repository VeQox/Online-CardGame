<script>
	import Modal from "./Modal.svelte"
	import Message from "./Message.js";

	const types = ["♣","♠","♦","♥"];
    const values = ["2","3","4","5","6","7","8","9","10","B","Q","K","A"];

	const protocol = "ws";
	const url = "localhost";
	const port = 8000;

	let name;
	let points;
	let cards = [];
	let currentPlayer;
	let playerID;
	let calls;
	let forcedType;
	let selectedCards;
	let playerCalls;

	let showReady = false;
	let showCalls = false;
	let ReadyCount = "";
	let readyState = -1;

	let ws;

	function Connect(){
		ws = new WebSocket(`${protocol}://${url}:${port}/${name}`);
		readyState = 0;
		ws.onopen = () => {
			readyState = 1;
			showReady = true;
			ws.send(new Message("hello", "test"));
		}
		ws.onerror = () => {
			readyState = -1;
		}
		ws.onmessage = (ev) => {

			let data = JSON.parse(ev.data);
			console.log(data);

			switch (data._head) {
				case "updateReady":
					ReadyCount = data._body;
					break;
				case "updateCards":
					cards = data._body._cards;
					break;
				case "startGame":
					showReady = false;
					playerID = data._body.id;
					console.log(data._body.players);
					break;
				case "updateCurrentPlayer":
					currentPlayer = data._body;
					break;
				case "selectedCards":
					if(data._body._cards.length == 0){
						forcedType = undefined;
						selectedCards = undefined;
					}
					else{
						selectedCards = data._body._cards;
					}
					
					break;
				case "newTrick":
					forcedType = data._body;
					break;
				case "setCalls":
					playerCalls = data._body;
					showCalls = true;
					break;
				case "startRound":
					showCalls = false;
					break;
				case "updateCalls":
					if(showCalls == true){
						playerCalls = data._body;
					}
					break;
			}
		}
	}

	function setReady(){
		ws.send(new Message("setReady", ""))
	}

	function select(id){
		console.log(`ID = ${playerID}, CurrentPlayer = ${currentPlayer}, CardIndex = ${id}`);
		if(playerID != currentPlayer) return;
		ws.send(new Message("selectCard", id));
	}

	function setCalls(){
		ws.send(new Message("setCalls", calls));
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

<Modal title="Waiting for Players" open={showReady}>
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

<Modal title="SetCalls" open={showCalls}>
	<div class="container">
		<div class="row">
			{#each cards as card}
				<div class="col text-center">
					{types[card._type]} {values[card._value]}
				</div>
			{/each}
		</div>
		<div class="row">
			{#each playerCalls as pCalls}
				<div class="col text-center">
					{pCalls} 
				</div>

			{/each}
		</div>
	</div>
	<div class="modal-footer d-flex justify-content-center">
		<form class="d-flex align-items-center">
			<input class="form-control w-50 m-1 text-center" placeholder="Calls" bind:value={calls}>	
			<button type="button" class="btn btn-success" on:click={setCalls}>Lock</button>
		</form>
	</div>
</Modal>

<div class="container">
	<div class="row">
		{#each cards as card, i}
			<div id={i} class="col text-center" on:click={() => select(i)}>
				{types[card._type]} {values[card._value]}
			</div>
		{/each}
	</div>
</div>

{#if readyState == 1}
	<div class="row">
		{#if selectedCards != undefined}
			<div class="col text-center">
				{types[forcedType._type]}
			</div>
			{#each selectedCards as card}
			<div class="col text-center">
				{types[card._type]} {values[card._value]}
			</div>
			{/each}
		{/if}
	</div>
{/if}


<style>
	img {
		height: 2.5rem;
	}
	.btn:focus {
		outline: none;
		box-shadow: none;
	}
</style>