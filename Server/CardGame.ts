import Cards from "./Cards";
import Players from "./Players";
import Player from "./Player";
import Card from "./Card";
import Message from "./Message";

export default class CardGame {
    private _players : Players;
    private _usedCards : Cards;
    private _selectedCards : Cards;

    public started : boolean;
    private _reverse :boolean;

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
                let card: Card = new Card(Card.types.indexOf(type), Card.types.indexOf(value));
                tmp.add(card);
            });
        });
        return tmp;
    }

    public get count(){
        return this._players.count();
    }

    public get readyCount(){
        return this._players.readyCount()
    }

    public add(player : Player){
        this._players.add(player);
    }

    public remove(player : Player){
        this._players.remove(player);
    }

    public getAt(index : number){
        return this._players.getAt(index);
    }

    public getNewHands(amount : number){
        this._usedCards = new Cards();
        this._players.setCards(amount, this.withdrawCards);
    }

    private withdrawCards(amount : number){
        let cards : Cards = {} as Cards;
        for (let i = 0; i < amount; i++) {
            const card : Card = this.withdrawCard();
            cards.add(card);
            this._usedCards.add(card);
        }
        return cards;
    }

    private withdrawCard(){
        let card : Card;
        do {
            card = CardGame.stack.getAt(Math.floor(Math.random()*CardGame.stack.count()));
        } while (this._usedCards.contains(card) === false);
        return card;
    }

    public selectCard(player : Player, selected : number){
        if(player.hasSelected()) return false;
        if(player != this._players.getAt(this._currentPlayer)) return false;

        player.selectedCardIndex = selected;
        this._selectedCards.add(player.selectedCard());

        return true;
    }

    public updateSelectedCards(){
        this._players.emit(new Message("selectedCards", this._selectedCards));
    }

    public updateReady(){
        this._players.emit(new Message("updateReady", `${this.readyCount} / ${this.count}`));
    }

    public updateCards(){
        this._players.updateCards();
    }

    public areReady(){
        return this._players.areReady();
    }

    public start(){
        this._startingPlayer = 0;
        this._currentPlayer = 0;
        this._cardsPerRound = 1;

        this.started = true;
        this.getNewHands(this._cardsPerRound);
        this._players.startup();
    }
}