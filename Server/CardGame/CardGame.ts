import Cards from "./Players/Cards/Cards";
import Players from "./Players/Players";
import Player from "./Players/Player";
import Card from "./Players/Cards/Card";
import Message from "./Players/Message/Message";

export default class CardGame {
    private _players : Players;
    private _usedCards : Cards;
    private _selectedCards : Cards;
    public started : boolean;
    private _reverse : boolean;
    private _startingPlayer : number;
    private _currentPlayer : number;
    private _cardsPerRound : number;
    private _currentCards : number;

    constructor(){
        this._players = new Players();
        this._usedCards = new Cards();
        this._selectedCards = new Cards();

        this.started = false;
        this._reverse = false;

        this._startingPlayer = 0;
        this._currentPlayer = 0;
        this._cardsPerRound = 1;
        this._currentCards = 1;
    }

    public static stack : Cards = CardGame.initStack();
    private static initStack(){
        let tmp : Cards = new Cards();
        Card.types.forEach(type => {
            Card.values.forEach(value => {
                let card : Card = new Card(type, value);
                tmp.add(card);
            });
        });
        return tmp;
    }
    public get count(){
        return this._players.count;
    }

    public get readyCount(){
        return this._players.readyCount
    }

    public get isRoundOver(){
        if(this._players.cardsAmount == 0) return true;
        return false;
    }

    public get haveSelected(){
        return this._players.haveSelected;
    }

    public get haveSetCalls(){
        return this._players.haveSetCalls;
    }

    public get areReady(){
        return this._players.areReady;
    }

    public add(player : Player){
        this._players.add(player);
        this.updateReady();
    }
 
    public remove(player : Player){
        this._players.remove(player);
        this.updateReady();
    }

    public getAt(index : number){
        return this._players.getAt(index);
    }

    public print(){
        console.table(this);
    }

    public getNewHands(){
        this._usedCards = new Cards();
        this._players.cards = this.withdrawCards(this._cardsPerRound);
    }

    private withdrawCards(amount : number){
        let newCards : Cards[] = [];
        for(let i = 0; i < this._players.count; i++){
            let cards : Cards = new Cards();
            for (let i = 0; i < amount; i++) {
                const card : Card = this.withdrawCard()
                cards.add(card);
                this._usedCards.add(card);
            }
            newCards.push(cards);
        }
        
        return newCards;
    }

    private withdrawCard(){
        let card : Card;
        do {
            card = CardGame.stack.getAt(Math.floor(Math.random()*CardGame.stack.count));
        } while (this._usedCards.contains(card) === true);
        return card;
    }

    public updateReady(){
        this._players.emit(new Message("updateReady", `${this.readyCount} / ${this.count}`));
    }

    public startGame(){
        this.started = true;

        this._players.setIDs();
        this.startRound();
    }

    public async getCall(){
        this._players.getAt(this._startingPlayer).getCall();
        this.updateStartingPlayer();
    }

    private updateStartingPlayer(){
        this._startingPlayer++;
        if(this._startingPlayer == this.count){
            this._startingPlayer == 0;
        }
    }

    public startRound(){
        this.getNewHands();
        this.getCall();
    }
}