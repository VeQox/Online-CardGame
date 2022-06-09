export default class Card{
    private _type : number;
    private _value : number;

    static types : string[] = ["♣","♠","♦","♥"];
    static values : string[] = ["2","3","4","5","6","7","8","9","10","B","Q","K","A"];

    public constructor(type : number, value : number){
        this._type = type;
        this._value = value;
    }

    public get type(){
        return Card.types[this._type];
    }

    public get value(){
        return Card.values[this._value];
    }

    public toString(){
        return `${this.type} ${this.value}`;
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
}