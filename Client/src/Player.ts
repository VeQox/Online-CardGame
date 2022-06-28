import Cards from "../../Server/CardGame/Players/Cards/Cards"

export default class Player{
    public name : string;
    public cards : Cards;
    public points : number;
    public hasSetCall : boolean;
    public ID : number;

    constructor(){
        this.name = "";
        this.cards = new Cards();
        this.points = 0;
        this.hasSetCall = false;
        this.ID = -69420;
    }
}