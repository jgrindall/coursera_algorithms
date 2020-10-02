import * as _ from "lodash";

export type Nullable<T> = T | undefined;

export class Node{
    private _val:number;
    private _left?:Node;
    private _right?:Node;
    private _parent?:Node;
    constructor(val:number){
        this._val = val;
    }
    public getNumChildren():number{
        let n:number  = 0;
        if(this.getLeft()){
            n++;
        }
        if(this.getRight()){
            n++;
        }
        return n;
    }
    public setVal(val:number){
        this._val = val;
    }
    public addLeft(n:Node):void{
        if(n){
            n.setParent(this);
        }
        this._left = n;
    }
    public addRight(n:Node):void{
        if(n){
            n.setParent(this);
        }
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

    static fromNode(node:Node){
        const b:Bst = new Bst([]);
        b.setRoot(node);
        return b;
    }

    getPredecessorOf(val:number):Node{
        const nodeInfo:NodeInfo = this.find(val);
        const left = nodeInfo.node.getLeft();
        if(left){
            return Bst.fromNode(left).getMax();
        }
        let parent = nodeInfo.parentNode;
        if(parent){
            while(parent && parent.getVal() > val){
                parent = parent.getParent();
            }
            return parent;
        }
        else{
            return undefined;
        }
    }

    getMin():Node{
        if(!this._root){
            return undefined
        }
        let node = this._root;
        while(node && node.getLeft()){
            node = node.getLeft();
        }
        return node;
    }

    getMax():Node{
        if(!this._root){
            return undefined
        }
        let node = this._root;
        while(node && node.getRight()){
            node = node.getRight();
        }
        return node;
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

    setRoot(n:Node):void{
        this._root = n;
    }

    find(val:number) : NodeInfo{
        if(!this._root){
            return {
                node:undefined,
                parentNode:undefined
            };
        }
        let node:Nullable<Node> = this._root;
        let parentNode:Nullable<Node> = undefined;
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

    getEntriesForNode(n:Node):Array<string>{
        const left:Node = this._root.getLeft(), right:Node = this._root.getRight();
        const entries:Array<string> = [];
        entries.push(left ? '' + left.getVal() : "null");
        entries.push(right ? '' + right.getVal() : "null");
        return entries;
    }

    toString():string{
        return JSON.stringify(this.toHash(), null, 2);
    }
    toHash():object{
        if(!this._root){
            return {
                '<empty>':"<empty>"
            };
        }
        const left:Node = this._root.getLeft(), right:Node = this._root.getRight();
        const entries = {};
        entries['' + this._root.getVal()] = this.getEntriesForNode(this._root)
        if(left){
            (<any>Object).assign(entries, Bst.fromNode(left).toHash());
        }
        if(right){
            (<any>Object).assign(entries, Bst.fromNode(right).toHash());
        }
        return entries;
    }

    _remove(nodeInfo:NodeInfo){
        const numChildren = nodeInfo.node.getNumChildren();
        const val = nodeInfo.node.getVal();
        if(numChildren === 0){
            if(nodeInfo.parentNode){
                if(nodeInfo.parentNode.getLeft() === nodeInfo.node){
                    nodeInfo.parentNode.addLeft(undefined);
                }
                else{
                    nodeInfo.parentNode.addRight(undefined);
                }
            }
            else{
                this._root = undefined;
            }
        }
        else if(numChildren === 1){
            const uniqueChild = nodeInfo.node.getLeft() || nodeInfo.node.getRight();
            if(nodeInfo.parentNode){
                if(nodeInfo.parentNode.getLeft() === nodeInfo.node){
                    nodeInfo.parentNode.addLeft(uniqueChild);
                }
                else{
                    nodeInfo.parentNode.addRight(uniqueChild);
                }
            }
            else{
                this._root = uniqueChild;
            }
        }
        else{
            const predecessor:Node = this.getPredecessorOf(val);
            const predecessorVal:number = predecessor.getVal();
            predecessor.setVal(val);
            nodeInfo.node.setVal(predecessorVal);
            // predecessor has no right child
            this._remove({
                node:predecessor,
                parentNode:predecessor.getParent()
            });
        }
    }

    remove(val:number):boolean{
        const nodeInfo:NodeInfo = this.find(val);
        if(!nodeInfo){
            return false;
        }
        this._remove(nodeInfo);
    }

}
