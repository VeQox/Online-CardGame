import { WebSocket } from "ws";
import Player from "./CardGame/Players/Player";
import Cards from "./CardGame/Players/Cards/Cards";
import Card from "./CardGame/Players/Cards/Card";
import Players from "./CardGame/Players/Players";


console.log("Card Tests");
console.log("=======================");
let tCards = new Cards();
tCards.add(new Card("♣", "2"))
tCards.add(new Card("♥", "A"));
console.log("Raw");
console.log((tCards.toString()));
// Checks if the JSON format is correct
let parsedCards = JSON.parse(tCards.toString());
tCards.sort();
console.log("Sorted");
tCards.print();
console.log("At Index 0");
console.log(tCards.getAt(0).toString());
tCards.getAt(0).print();


console.log("Player Tests");
console.log("=======================");
let tPlayers = new Players();
tPlayers.add(new Player("helloo", {} as WebSocket));
tPlayers.add(new Player("hi", {} as WebSocket));
tPlayers.add(new Player("goodbye", {} as WebSocket));
tPlayers.print();
console.log("At Index 0");
tPlayers.getAt(0).print();
