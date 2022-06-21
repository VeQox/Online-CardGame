import Card from "./Card";

export default class Cards{
    private _cards : Card[] = [];

    public get count(){
        return this._cards.length;
    }

    public add(card : Card){
        this._cards.push(card);
    }

    public remove(cards : Cards) : void
    public remove(card : Card) : void
    public remove(parameter : Cards | Card){
        if(parameter instanceof Cards){
            parameter._cards.forEach(card => {
                this.remove(card);
            });
        }
        else{
            this._cards.splice(this._cards.indexOf(parameter), 1);
        }
       
    }

    public removeAt(index : number){
        this._cards.splice(index, 1);
    }

    public getAt(index : number){
        return this._cards[index];
    }

    public contains(card : Card){
        for(let _card of this._cards){
            if(_card == card) return true;
        }
        return false;
    }

    public sort(){
        this._cards.sort((a : Card, b : Card) => {
            return a.compareTo(b);
        });
    }

    public toString(){
        let cards = "[\n";
        this._cards.forEach(card => {
            cards += `  ${card.toString()}\n`;
        });
        cards += "]";  
        return cards;
    }

    public print(){
        console.table(this._cards);
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
}