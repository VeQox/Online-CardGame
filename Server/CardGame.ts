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
                let card: Card = new Card(Card.types.indexOf(type), Card.values.indexOf(value));
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
    }

    public getAt(index : number){
        return this._players.getAt(index);
    }

    public getNewHands(amount : number){
        this._usedCards = new Cards();
        this._players.cards = this.withdrawCards(amount);
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

    public selectCard(player : Player, selected : number){
        if(player.hasSelected) return;
        if(player != this._players.getAt(this._currentPlayer)) return;

        player.selectedCardIndex = selected;
        this._selectedCards.add(player.selectedCard);

        if(this.isStartingPlayer(player)){
            this.newTrick(player);
        }

        this.updateCurrentPlayer();
        this.updateSelectedCards();

        console.log(`[Client ${player.name}] selected ${JSON.stringify(player.selectedCard)}`);

        if(this.haveSelected){
            this.endTrick();
            if(this.isRoundOver){
                this.endRound();
            }
        }
    }

    public updateSelectedCards(){
        this._players.emit(new Message("selectedCards", this._selectedCards));
    }

    private updateReady(){
        this._players.emit(new Message("updateReady", `${this.readyCount} / ${this.count}`));
    }

    public updateCards(){
        this._players.updateCards();
    }

    private updateCurrentPlayer(){
        this._currentPlayer++;
        if(this._currentPlayer == this._players.count){
            this._currentPlayer = 0;
        }
        this._players.emit(new Message("updateCurrentPlayer", this._currentPlayer));
    }

    public isStartingPlayer(player : Player){
        return this._players.indexOf(player) == this._startingPlayer;
    }

    public newTrick(startingPlayer : Player){
        this._players.emit(new Message("newTrick", startingPlayer.selectedCard));
    }

    public setCalls(){
        let currentPlayer = this._players.getAt(this._currentPlayer);
        currentPlayer.send(new Message("setCalls", this._players.calledHits));
        currentPlayer.hasSetCall = true;
        this._players.emit(new Message("updateCalls", this._players.calledHits))
        this.updateCurrentPlayer();
    }
    
    public startRound(){
        this._players.emit(new Message("startRound", ""));
    }

    public endTrick(){
        let winner = this._players.getWinnerOfTrick();
        winner.actualHits++;

        this._startingPlayer = this._players.indexOf(winner);
        this._currentPlayer = this._startingPlayer;

        this._players.removeCards(this._selectedCards);
        this._players.resetSelectedCard();
    }

    public endRound(){
        this._players.calcPoints();
        this._players.resetCalls();
        this._players.resetHits();
        this.updateCardsPerRound();
        this.getNewHands(this._cardsPerRound);
        this._players.updateCards();
        this.setCalls();
        this._selectedCards = new Cards();
        this._players.emit(new Message("selectedCards", this._selectedCards));
        this._players.emit(new Message("updateCards", this._selectedCards));
    }

    private updateCardsPerRound(){
        if(this._cardsPerRound == 10) this._reverse = true;
        if(this._reverse) this._cardsPerRound--;
        else this._cardsPerRound++;
    }

    public setReady(player : Player){
        if(this.started) return;
        player.readyState = true;
        this.updateReady();
    
        // Start the Game 
        if(this.areReady && this.readyCount >= 2){
            console.log(`Game started with ${this._players.count} players`)
            this.started = true;
            this.getNewHands(this._cardsPerRound);
            this._players.start();
            this._players.emit(new Message("updateCurrentPlayer", this._currentPlayer));
            this.updateCards();
            this.setCalls();
        }
    }
}