import { WebSocket } from "ws";
import Player from "./CardGame/Players/Player";
import Cards from "./CardGame/Players/Cards/Cards";
import Card from "./CardGame/Players/Cards/Card";
import Players from "./CardGame/Players/Players";
import CardGame from "./CardGame/CardGame";

console.log("Card Tests");
console.log("=======================");
let cards = new Cards();
cards.add(new Card("♣", "2"));
cards.add(new Card("♥", "A"));
console.log("Raw");
// checks if the card JSON format is correct
let parsedCard = JSON.parse(cards.getAt(0).toString());
console.log((cards.toString()));
// Checks if the JSON format is correct
let parsedCards = JSON.parse(cards.toString());
cards.sort();
console.log("Sorted");
cards.print();
console.log("At Index 0");
console.log(cards.getAt(0).toString());
cards.getAt(0).print();


console.log("Player Tests");
console.log("=======================");
let players = new Players();
players.add(new Player("helloo", {} as WebSocket));
players.add(new Player("hi", {} as WebSocket));
players.add(new Player("goodbye", {} as WebSocket));
players.print();
console.log("At Index 0");
players.getAt(0).print();