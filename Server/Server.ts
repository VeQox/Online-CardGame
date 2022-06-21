import CardGame from "./CardGame/CardGame";
import { IncomingMessage } from "http";
import { WebSocket, RawData, WebSocketServer } from "ws";
import Player from "./CardGame/Players/Player";
import Message from "./CardGame/Players/Message/Message";
import Cards from "./CardGame/Players/Cards/Cards";
import Card from "./CardGame/Players/Cards/Card";

// Cards Tests
let tCards = new Cards();
tCards.add(new Card("♥", "B"));
tCards.add(new Card("♣", "2"))
tCards.add(new Card("♥", "A"));
console.log("Raw");
console.log(tCards.toString());
tCards.sort();
console.log("Sorted");
console.table(tCards.toString());
console.log(tCards.getAt(0).toString());

/*

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

            console.log(`[Client ${player.name}] sent ${msg.toString()}`);

            switch(head){
                case "setReady":
                    Game.setReady(player);
                    break;
                case "setCalls":
                    player.calledHits = body;
                    if(Game.haveSetCalls){
                        Game.startRound();
                        return; 
                    }
                    Game.setCalls();
                    break;
                case "setSelectedCard":
                    Game.selectCard(player, body)
                    break;
            }
        });

        ws.on("close", (code : number) => {
            Game.remove(player);
            
            console.log(`[Client ${player.name}] disconnected with code ${code}`);
        });
    }
});
*/