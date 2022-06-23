import Cards from "../../Server/CardGame/Players/Cards/Cards"

export enum ConnectionStatus {
    Idle = 0, 
    Connecting = 1,
    Connected = 2,
}

export default class Player{
    public name : string;
    public cards : Cards;
    public points : number;
    public hasSetCall : boolean;
    public status : ConnectionStatus;

    constructor(){
        this.name = "";
        this.cards = new Cards();
        this.points = 0;
        this.hasSetCall = false;
        this.status = ConnectionStatus.Idle;
    }
}