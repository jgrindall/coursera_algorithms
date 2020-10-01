import * as _ from "lodash";

export type Nullable<T> = T | undefined;

class Node{
    private _val:number;
    private _left?:Node;
    private _right?:Node;
    private _parent?:Node;
    constructor(val:number){
        this._val = val;
    }
    public addLeft(n:Node):void{
        this._left = n;
        n.setParent(this);
    }
    public addRight(n:Node):void{
        n.setParent(this);
        this._right = n;
    }
    public getLeft():Nullable<Node>{
        return  this._left;
    }
    public getRight():Nullable<Node>{
        return this._right;
    }
    public getVal():number{
        return this._val;
    }
    public getParent():Nullable<Node>{
        return this._parent;
    }
    public setParent(p:Nullable<Node>){
        this._parent = p;
    }
}

export type NodeInfo = {
    node:Nullable<Node>,
    parentNode: Nullable<Node>
};

export class Bst{

    private _root:Nullable<Node>;

    constructor(vals:Array<number>){
        if(vals.length >= 1){
            this._root = new Node(vals[0]);
        }
        if(vals.length >= 2){
            for(let i = 1; i < vals.length; i++){
                this.add(vals[i]);
            }
        }
    }

    getMin():number{
        if(!this._root){
            return Infinity;
        }
        let node = this._root;
        while(node && node.getLeft()){
            node = node.getLeft();
        }
        return node.getVal();
    }

    getMax():number{
        if(!this._root){
            return -Infinity;
        }
        let node = this._root;
        while(node && node.getRight()){
            node = node.getRight();
        }
        return node.getVal();
    }

    static getAllVals(n:Node):Array<number>{
        const left:Node = n.getLeft(), right:Node = n.getRight();
        const leftVals:Array<number> = left ? Bst.getAllVals(left) : [];
        const rightVals:Array<number> = right ? Bst.getAllVals(right) : [];
        return [...leftVals, n.getVal(), ...rightVals];
    }

    checkPropertyAtRoot(){
        return this.checkPropertyAtNode(this._root);
    }

    checkPropertyAtNode(n:Node):boolean{
        const val:number = n.getVal();
        const left:Nullable<Node> = n.getLeft();
        const leftVals = left ? Bst.getAllVals(left) : [];
        const leftWrong = leftVals.filter(v => v > val);
        if(leftWrong.length >= 1){
            return false;
        }
        const right:Nullable<Node> = n.getRight();
        const rightVals = right ? Bst.getAllVals(right) : [];
        const rightWrong = rightVals.filter(v => v < val);
        if(rightWrong.length >= 1){
            return false;
        }
        return true;
    }

    getRoot():Node | undefined{
        return this._root;
    }

    find(val:number) : NodeInfo{
        if(!this._root){
            return {
                node:undefined,
                parentNode:undefined
            };
        }
        let node:Nullable<Node> = this._root;
        let parentNode:Nullable<Node> = this._root;
        while(node && node.getVal() !== val){
            parentNode = node;
            if(val > node.getVal()){
                node = node.getRight();
            }
            else {
                node = node.getLeft();
            }
        }
        return {
            node,
            parentNode
        };
    }

    add(val:number){
        const newNode = new Node(val);
        if(!this._root){
            this._root = newNode;
        }
        else{
            const nodeInfo:NodeInfo = this.find(val);
            const parentNode:Nullable<Node> = nodeInfo.parentNode;
            if(parentNode){
                if(val > parentNode.getVal()){
                    parentNode.addRight(newNode);
                }
                else{
                    parentNode.addLeft(newNode);
                }
            }
        }
    }

    getList():Array<number>{
        return this._root ? Bst.getAllVals(this._root) : [];
    }

}
