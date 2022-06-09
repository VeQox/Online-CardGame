export default class Message{
    head : string;
    body : any;

    constructor(head : string, body : any){
        this.head = head;
        this.body = body;
    }

    /**
     * returns the message obj as a string
     * @returns 
     */
    toString(){
        return JSON.stringify(this);
    }

    /**
     * returns the obj string as a JSON obj
     * @param obj 
     * @returns 
     */
    parse(obj : string){
        return JSON.parse(obj);
    }
}