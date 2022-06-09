export default class Message{
    head : string;
    body : any;

    constructor(head : string, body : any){
        this.head = head;
        this.body = body;
    }

    toString(){
        return JSON.stringify(this);
    }

    parse(obj : string){
        return JSON.parse(obj);
    }
}