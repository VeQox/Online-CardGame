import Cards from "./Cards";
import Card from "./Card";
import WebSocket from "ws";
import Message from "./Message";
import Players from "./Players";

export default class Player{
    public name : string;
    private _cards : Cards;

    private _points : number;
    public actualHits : number;
    public calledHits : number;
    public selectedCardIndex : number;

    private _connection : WebSocket;

    public readyState : boolean;
    public hasSetCall : boolean;

    constructor(name : string, connection : WebSocket){
        this.name = name;
        this._connection = connection;
        this._cards = new Cards();
        this._points = 0;
        this.actualHits = 0;
        this.calledHits = 0;
        this.selectedCardIndex = -1;
        this.readyState = false;
        this.hasSetCall = false;
    }

    public set cards(cards : Cards){
        this._cards = cards;
    }

    public get cards(){
        return this._cards;
    }

    public get points(){
        return this._points;
    }

    public get selectedCard(){
        return this._cards.getAt(this.selectedCardIndex);
    }

    public compareTo(other : Player){
        if(this.points > other.points) return 1;
        if(this.points < other.points) return -1;
        return 0;
    }

    public calcPoints(){
        if(this.calledHits == this.actualHits){
            this._points += this.calledHits + 1;
        }
            
        if(this.calledHits > this.actualHits){
            this._points += this.actualHits - this.calledHits;
        }

        if(this.calledHits < this.actualHits){
            this._points += this.calledHits - this.actualHits;
        }

        this.actualHits = 0;
    }

    public get hasSelected(){
        return this.selectedCardIndex !== -1;
    }

    public startup(id : number, playercount : number, players : Player[]){
        let names : string[] = [];
        players.forEach(player => {
            names.push(player.name);
        });
        this.send(new Message("startGame", {"id": id, "count": playercount, "players": names}));
    }

    public updateCards(){
        this._cards.sort();
        this.send(new Message("updateCards", this._cards));
    }

    public updatePoints(){
        this.send(new Message("updatePoints", this._points));
    }

    public send(message : Message){
        this._connection.send(message.toString())
    }
}