import CardGame from "./CardGame";
import { IncomingMessage } from "http";
import { WebSocket, RawData, WebSocketServer } from "ws";
import Player from "./Player";
import Message from "./Message";

const port = 8000;

let Game : CardGame = new CardGame();

const wss : WebSocketServer = new WebSocket.Server({port});

wss.on("listening", () => {
    console.log(`Server is listening on port ${port}`);
});

wss.on("connection", (ws : WebSocket, request : IncomingMessage) => {
    if(!request.url || Game.started || Game.count == 4){
        console.log(`[Client ${(request.url as string).substring(1)}] connection failed`);
        ws.close(1013);
    }
    else{
        let player : Player = new Player((request.url as string).substring(1), ws);
        Game.add(player);      
        Game.updateReady();

        console.log(`[Client ${player.name}] connected`);

        ws.on("message", (msg : RawData) => {
            const message : Message = JSON.parse(msg.toString());
            const body = message.body;
            const head = message.head;

            console.log(`[Client ${player.name}] sent ${msg.toString()}`);

            switch(head){
                case "setReady":
                    player.readyState = true;
                    Game.updateReady();

                    if(Game.areReady() && Game.readyCount >= 2){
                        Game.start();
                        Game.updateCards();
                    }
                    break;
                case "setCalls":
                    player.calledHits = body;
                    break;
                case "selectCard":
                    if(Game.selectCard(player, body)){

                        Game.updateSelectedCards();
                        

                        console.log(`[Client ${player.name}] selected ${JSON.stringify(player.selectedCard)}`);
                    }
                    break;
            }
        });

        ws.on("close", (code : number) => {
            Game.remove(player);
            
            console.log(`[Client ${player.name}] disconnected with code ${code}`);
        });
    }
});