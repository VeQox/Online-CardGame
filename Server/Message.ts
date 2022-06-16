export default class Message{ 
    
    private _head : Head;
    private _body : any;

    constructor(head : Head, body : any){
        this._head = head;
        this._body = body;
    }

    public get head(){
        return this._head;
    }

    public get body(){
        return this._body;
    }

    public toString(){
        return JSON.stringify(this);
    }
}

type Head = "updateCalls" |"setReady" | "selectCard" | "setCalls" | "updateReady" | "startGame" | "updateCards" | "updateCurrentPlayer" | "newTrick" | "newRound" | "updatePoints" | "selectedCards" | "startRound";