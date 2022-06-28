import Cards from "./Cards/Cards";
import WebSocket from "ws";
import Message from "./Message/Message";
import Card from "./Cards/Card";

export default class Player{
    public name : string;
    public cards : Cards;
    private _points : number;
    public actualHits : number;
    public _calledHits : number;
    public selectedCardIndex : number;
    private _connection : WebSocket;
    public readyState : boolean;
    public hasSetCall : boolean;

    constructor(name : string, connection : WebSocket){
        this.name = name;
        this._connection = connection;
        this.cards = new Cards();
        this._points = 0;
        this.actualHits = 0;
        this._calledHits = 0;
        this.selectedCardIndex = -1;
        this.readyState = false;
        this.hasSetCall = false;
    }

    public set calledHits(amount : number){
        this._calledHits = amount;
        this.hasSetCall = true;
    }
    
    public get points(){
        return this._points;
    }

    public get selectedCard(){
        return this.selectedCardIndex == -1 ? {} as Card : this.cards.getAt(this.selectedCardIndex);
    }

    public get hasSelected(){
        return this.selectedCardIndex !== -1;
    }

    public compareTo(other : Player){
        if(this.points > other.points) return 1;
        if(this.points < other.points) return -1;
        return 0;
    }

    public toString(){
        //return this;
        return `{"name": "${this.name}", "cards": "${1}", "points": "${this.points}", "readystate": "${this.readyState}", "selectedCard": "${this.selectedCard.toString()}", "hits": "${this.actualHits}", "calls": "${this.calledHits}", "hasSetCall": "${this.hasSetCall}"}`
    }

    public print(){
        console.table(this);
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

    public send(message : Message){
        this._connection.send(message.toString())
    }

    public getCall(){
        this.send(new Message("getCall", this.cards));
    }
}