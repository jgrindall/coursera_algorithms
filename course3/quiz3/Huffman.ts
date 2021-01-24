import * as _ from "lodash";

type Pair = [number, number];

export const stringToTree = (s:string):Node<string>=>{
    console.log('stringToTree', s);
    const firstLeft:number = s.indexOf("(");
    if(firstLeft === -1){
        const n:Node<string> = new Node<string>(s);
        return n;
    }
    const val:string = s.substr(0, firstLeft);
    const lr:string = s.substr(firstLeft);
    const stack:string[] = [];
    const chars:string[] = lr.split("");
    console.log('chars', chars);
    console.log('val', val);
    console.log('lr', lr);
    let leftIndex = -1;
    for(let i = 0; i < chars.length; i++){
        if(chars[i] === "("){
            stack.push(chars[i]);
        }
        else if(chars[i] === ")" && _.last(stack) === "("){
            stack.pop();
            if(stack.length === 0){
                leftIndex = i;
                break;
            }
        }
    }
    console.log('leftIndex', leftIndex);
    if(leftIndex >= 0){
        const left:string = lr.substring(1, leftIndex);
        const right:string = lr.substring(leftIndex + 2, lr.length - 1);
        console.log(left, left.length);
        console.log(right, right.length);
        const n:Node<string> = new Node<string>(val);
        if(left){
            n.addLeft(stringToTree(left));
        }
        if(right){
            n.addRight(stringToTree(right));
        }
        return n;
    }
    else{
        throw new Error("mismatch");
    }
    return undefined;
}

export class Node<T>{
    private _id:string;
    private _val?:T;
    private _left?:Node<T>;
    private _right?:Node<T>;
    constructor(val?:T){
        this._id = "" + Math.floor(Math.random() * 1000000);
        this._val = val;
    }
    public setVal(val:T){
        this._val = val;
    }
    public addLeft(n:Node<T>):void{
        this._left = n;
    }
    public addRight(n:Node<T>):void{
        this._right = n;
    }
    public getLeft():Node<T> | undefined{
        return  this._left;
    }
    public getRight():Node<T> | undefined{
        return this._right;
    }
    public getVal():T{
        return this._val;
    }
    public toString(){
        if(!this._left && !this._right){
            return (this._val || "");
        }
        return (this._val || "") + "(" + (this._left ? this._left.toString() : "") + ")" + "(" + (this._right ? this._right.toString() : "") + ")";
    }
}

const bfs = <T>(node:Node<T>, val:T):(Node<T> | undefined) => {
    if(node.getVal() === val){
        return node;
    }
    return bfs(node.getLeft(), val) || bfs(node.getRight(), val);
};

export const getMinPair = (weights:number[]):Pair=>{
    let minIndex1 = -1, minValue1 = Infinity;
    for(let i = 0; i < weights.length; i++){
        if(weights[i] < minValue1){
            minIndex1 = i;
            minValue1 = weights[i];
        }
    }
    let minIndex2 = -1, minValue2 = Infinity;
    for(let i = 0; i < weights.length; i++){
        if(i !== minIndex1 && weights[i] < minValue2){
            minIndex2 = i;
            minValue2 = weights[i];
        }
    }
    return [minIndex1, minIndex2];
};

type ValOrTree<T> = T | Node<T>;

export class Huffman{
    private alphabet:string[] = [];
    private weights:number[] = [];
    constructor(alphabet:string[], weights:number[]){
        this.alphabet = alphabet;
        this.weights = weights;
    }
    generate():string{
        console.log("alphabet", this.alphabet);
        console.log("weights", this.weights);

        if(this.alphabet.length === 1){
            return this.alphabet[0];
        }
        const indicesToMerge:Pair = getMinPair(this.weights);
        console.log(indicesToMerge);
        const newWeights:number[] = [];
        const newAlphabet:string[] = [];
        for(let i = 0; i < this.alphabet.length; i++){
            if(i !== indicesToMerge[0] && i !== indicesToMerge[1]){
                newWeights.push(this.weights[i]);
                newAlphabet.push(this.alphabet[i]);
            }
        }
        newWeights.push(this.weights[indicesToMerge[0]] + this.weights[indicesToMerge[1]]);
        newAlphabet.push("empty(" + this.alphabet[indicesToMerge[0]] + ")(" + this.alphabet[indicesToMerge[1]] + ")");
        //console.log("newAlphabet", newAlphabet.toString());
        return new Huffman(newAlphabet, newWeights).generate();
    }
}
