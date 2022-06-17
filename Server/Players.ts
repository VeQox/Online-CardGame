import Card from "./Card";
import Cards from "./Cards";
import Message from "./Message";
import Player from "./Player";

export default class Players{
    private _players : Player[] = [];

    public count(){
        return this._players.length;
    }

    public add(player : Player){
        this._players.push(player);
    }

    public remove(player : Player){
        this._players.splice(this._players.indexOf(player), 1);
    }

    public getAt(index : number){
        return this._players[index];
    }

    public indexOf(player : Player){
        return this._players.indexOf(player);
    }

    public areReady(){
        this._players.forEach(player => {
            if(!player.readyState) return false;
        });
        return true;
    }

    public readyCount(){
        let count = 0;
        this._players.forEach(player => {
            if(player.readyState) count++;
        });
        return count;
    }

    public calcPoints(){
        this._players.forEach(player => {
            player.calcPoints();
            player.updatePoints();
        });
    }

    public getWinnerOfTrick(){
        let winner : Player = this._players[0];

        this._players.forEach(player => {
            const compareValue = player.selectedCard().compareTo(winner.selectedCard())
            if(compareValue == 1) winner = player;
        });

        return winner;
    }

    public updateCards(){
        this._players.forEach(player => {
            player.updateCards();
        });
    }

    public startup(){
        let id = 0;
        this._players.forEach(player => {
            player.startup(id, this.count(), this._players);
            id++;
        }); 
    }

    public emit(message : Message){
        this._players.forEach(player => {
            player.send(message);
        })
    }

    public sort(){
        this._players.sort((a : Player, b : Player) => {
           return a.compareTo(b);
        });
    }

    public set cards(newCards : Cards[]){
        this._players.forEach((player, i) => {
            player.cards = newCards[i];
        })
    }

    public get cardsLength(){
        return this._players[0].cards.count();
    }

    public contains(player : Player){
        for(let _player of this._players){
            if(_player == player) return true;
        }
        return false;
    }

    public get calledHits(){
        let calls : number[] = [];
        this._players.forEach(player => {
            calls.push(player.calledHits);
        });
        return calls;
    }

    public haveSetCalls(){
        let returnval = true;
        this._players.forEach(player => {
            if(!player.hasSetCall){
                returnval = false;
                return;
            } 
        });
        return returnval;
    }

    public get haveSelected(){
        for(let player of this._players){
            if(!player.hasSelected()) return false;
        }
        return true;
    }

    public removeCards(cards : Cards){
        this._players.forEach(player => {
            cards.cards().forEach(card => {
                player.cards.remove(card);
            });
        });
    }

    public resetCalls(){
        this._players.forEach(player => {
            player.calledHits = 0;
        });
    }

    public resetSelectedCard(){
        this._players.forEach(player => {
            player.selectedCardIndex = -1;
        });
    }

    public resetHits(){
        this._players.forEach(player => {
            player.actualHits = 0;
        });
    }
}