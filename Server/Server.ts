import CardGame from "./CardGame/CardGame";
import { IncomingMessage } from "http";
import { WebSocket, RawData, WebSocketServer } from "ws";
import Player from "./CardGame/Players/Player";
import Message from "./CardGame/Players/Message/Message";
import Cards from "./CardGame/Players/Cards/Cards";
import Card from "./CardGame/Players/Cards/Card";
import Players from "./CardGame/Players/Players";

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

        console.log(`[Client ${player.name}] connected`);


        ws.on("message", (msg : RawData) => {
            const message : Message = JSON.parse(msg.toString());
            const body = message.body;
            const head = message.head;

            console.log(`[Client ${player.name}] sent ${msg}`);

            switch(head){
                case "setReady":
                    player.readyState = true;
                    Game.updateReady();
                    if(Game.areReady && Game.count >= 2){
                        Game.startGame();

                    }
                    break;
                    /*
                case "setCall":
                    player.calledHits = body;
                    if(!Game.haveSetCalls){
                        player.getCall();
                    }
                    else{
                        Game.startRound();
                    }
                    break;
                    */
            }
        });

        ws.on("close", (code : number) => {
            Game.remove(player);
            
            console.log(`[Client ${player.name}] disconnected with code ${code}`);
        });
    }
});