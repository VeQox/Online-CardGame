import Card from "./Card";

export default class Cards{
    private _cards : Card[] = [];

    public add(card : Card){
        this._cards.push(card);
    }

    public remove(card : Card){
        this._cards.splice(this._cards.indexOf(card), 1);
    }

    public removeAt(index : number){
        this._cards.splice(index, 1);
    }

    public get cards(){
        return this._cards;
    }

    public getAt(index : number){
        return this._cards[index];
    }

    private getPerType(type : string){
        let filteredCards : Card[] = [];
        this._cards.forEach(card => {
            if(card.type == type){
                filteredCards.push(card);
            }
        });
        return filteredCards;
    }

    public getUsableCards(card : Card){
        let usableCards = this.getPerType(card.type);
        return usableCards.length == 0 ? this._cards : usableCards;
    }

    public contains(card : Card){
        for(let _card of this._cards){
            if(_card == card) return true;
        }
        return false;
    }

    public get count(){
        return this._cards.length;
    }

    public sort(){
        this._cards.sort((a : Card, b : Card) => {
            return a.compareTo(b);
        });
    }
}