import type Message from "../../Server/CardGame/Players/Message/Message"
import Cards from "../../Server/CardGame/Players/Cards/Cards"

enum ConnectionStatus {
    Idle = 0, 
    Connecting = 1,
    Connected = 2,
}

export default class Player{
    public name : string;
    public cards : Cards;
    public points : number;
    public connectionStatus : ConnectionStatus;
    public hasSetCall : boolean;
    private _ws : WebSocket;

    constructor(){
        this.name = "";
        this.cards = new Cards();
        this.points = 0;
        this.connectionStatus = ConnectionStatus.Idle;
        this.hasSetCall = false;
        this._ws = {} as WebSocket;
    }

    public send(message : Message){
        this._ws.send(message.toString());
    }

    public connect(url : string){
        this._ws = new WebSocket(`${url}${this.name}`);
        this.connectionStatus = ConnectionStatus.Connecting;
        this._ws.onopen = () => this.onOpen();
        this._ws.onerror = () => this.onError();
    }

    private onOpen(){
        this.connectionStatus = ConnectionStatus.Connected;
        this._ws.onmessage = (ev) => this.onMessage(ev);
    }

    private onError(){
        this.connectionStatus = ConnectionStatus.Idle;
    }

    private onMessage(msg : MessageEvent){
        const data : Message = JSON.parse(msg.data);
        console.log(`[Origin Server]`);
        console.log(data)
    }
}