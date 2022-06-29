export default class Message{ 
    
    public readonly head : Head;
    public readonly body : any;

    constructor(head : Head, body : any){
        this.head = head;
        this.body = body;
    }

    public toString(){
        return JSON.stringify(this);
    }
}

type Head =  "setReady"
            |"updateReady"
            |"selectCard"
            |"setCall"
            |"getCall"
            |"startGame"
