import Cards from "../../Server/CardGame/Players/Cards/Cards"

export default class Player{
    public name : string;
    public cards : Cards;
    public points : number;
    public hasSetCall : boolean;

    constructor(){
        this.name = "";
        this.cards = new Cards();
        this.points = 0;
        this.hasSetCall = false;
    }
}