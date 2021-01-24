import * as _ from "lodash";

export const stringToTree = (s:string):Node<string>=>{
    const firstLeft:number = s.indexOf("(");
    if(firstLeft === -1){
        const n:Node<string> = new Node<string>(s);
        return n;
    }
    const val:string = s.substr(0, firstLeft);
    const lr:string = s.substr(firstLeft);
    const stack:string[] = [];
    const chars:string[] = lr.split("");
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
    if(leftIndex >= 0){
        const left:string = lr.substring(1, leftIndex);
        const right:string = lr.substring(leftIndex + 2, lr.length - 1);
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
}

export const getDepth = (tree:Node<string>, a:string):number=>{
    if(!tree){
        return -1;
    }
    if(tree.getVal() === a){
        return 0;
    }
    else{
        const lFind = getDepth(tree.getLeft(), a);
        const rFind = getDepth(tree.getRight(), a);
        if(lFind >= 0){
            return lFind + 1;
        }
        else if(rFind >= 0){
            return rFind + 1;
        }
        return -1;
    }
};

export class Node<T>{
    private _val?:T;
    private _left?:Node<T>;
    private _right?:Node<T>;
    constructor(val?:T){
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
