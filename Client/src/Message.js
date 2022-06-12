export default class Message{ 
    head;
    body;

    constructor(head, body){
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
    parse(obj){
        return JSON.parse(obj);
    }
}