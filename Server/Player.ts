import Cards from "./Cards";
import Card from "./Card";
import WebSocket from "ws";
import Message from "./Message";

export default class Player{
    public name : string;
    private _cards : Cards;

    private _points : number;
    public actualHits : number;
    public calledHits : number;
    public selectedCardIndex : number;

    private _connection : WebSocket;

    public readyState : boolean;

    constructor(name : string, connection : WebSocket){
        this.name = name;
        this._connection = connection;
        this._cards = {} as Cards;
        this._points = 0;
        this.actualHits = 0;
        this.calledHits = 0;
        this.selectedCardIndex = -1;
        this.readyState = false;
    }

    public set cards(cards : Cards){
        this._cards = cards;
    }

    public points(){
        return this._points;
    }

    public selectedCard(){
        return this._cards.getAt(this.selectedCardIndex);
    }

    public selectSuccessful(){
        this.send(new Message("selectSuccessful", ""));
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

    public hasSelected(){
        return this.selectedCardIndex !== -1;
    }

    public startup(id : number, playercount : number){
        this.send(new Message("start", {"id": id, "count": playercount}));
    }

    public updateCards(){
        this.send(new Message("server", this._cards));
    }

    public updatePoints(){
        this.send(new Message("server", this._points));
    }

    public send(message : Message){
        this._connection.send(message.toString())
    }
}