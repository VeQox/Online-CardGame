export default class Card{
    public type : string;
    public value : string;

    static types : string[] = ["♣","♠","♦","♥"];
    static values : string[] = ["2","3","4","5","6","7","8","9","10","B","Q","K","A"];

    public constructor(type : string, value : string){
        this.type = type;
        this.value = value;
    }

    public toString(){
        return `{"type": "${this.type}", "value": "${this.value}"}`;
    }

    public compareTo(other : Card){  
        if(this._type == other._type)
            return this._value > other._value ? 1 : -1;

        if(this._type > other._type)
            return 1;

        if(this._type < other._type)
            return -1;

        return 0;
    }

    // Not great
    protected get _type(){
        return Card.types.indexOf(this.type);
    }

    protected get _value(){
        return Card.values.indexOf(this.value);
    }
}