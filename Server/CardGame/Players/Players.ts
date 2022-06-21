import Cards from "./Cards/Cards";
import Message from "./Message/Message";
import Player from "./Player";

export default class Players{
    private _players : Player[] = [];

    public set cards(newCards : Cards[]){
        this._players.forEach((player, i) => {
            player.cards = newCards[i];
        })
    }

    public get cardsAmount(){
        return this._players[0].cards.count;
    }

    public get count(){
        return this._players.length;
    }

    public get readyCount(){
        let count = 0;
        this._players.forEach(player => {
            if(player.readyState) count++;
        });
        return count;
    }
    
    public get calledHits(){
        let calls : number[] = [];
        this._players.forEach(player => {
            calls.push(player.calledHits);
        });
        return calls;
    }

    public get areReady(){
        this._players.forEach(player => {
            if(!player.readyState) return false;
        });
        return true;
    }

    public get haveSetCalls(){
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
            if(!player.hasSelected) return false;
        }
        return true;
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

    public contains(player : Player){
        for(let _player of this._players){
            if(_player == player) return true;
        }
        return false;
    }

    public removeCards(cards : Cards){
        this._players.forEach(player => {
            cards.remove(cards);
        });
    }

    public sort(){
        this._players.sort((a : Player, b : Player) => {
           return a.compareTo(b);
        });
    }

    /*
    public toString(){
        return this._players;
        let players = "[\n";
        this._players.forEach(player => {
            players += `  ${player.toString()}\n`;
        });
        players += "]\n";  
        return players;
        
    }
    */
    
    public print(){
        console.table(this._players);
    }

    public emit(message : Message){
        this._players.forEach(player => {
            player.send(message);
        })
    }
}