import * as _ from "lodash";

/**
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
    }
    public addRight(n:Node):void{
        this._right = n;
    }
    public getLeft():Node{
        return  this._left;
    }
    public getRight():Node{
        return this._right;
    }
    public getVal():number{
        return this._val;
    }
    public getParent():Node{
        return this._parent;
    }
    public setParent(p:Node){
        this._parent = p;
    }
}
**/

export enum HeapType{
    MIN = "min",
    MAX = "max"
};

export class Heap{

    private _vals:Array<number>;
    private _type:HeapType;

    constructor(vals:Array<number>, type:HeapType = HeapType.MIN){
        this._type = type;
        this._vals = [];
        if(vals.length >= 1){
            this._vals.push(vals[0]);
        }
        if(vals.length >= 2){
            for(let i = 1; i < vals.length; i++){
                this.insert(vals[i]);
            }
        }
    }

    private _swapElementsAt(i:number, j:number){
        const t = this._vals[i];
        this._vals[i] = this._vals[j];
        this._vals[j] = t;
    }

    private _getParentIndex(i:number){
        return Math.floor((i - 1)/2);
    }

    getChildren(i:number):Array<number>{
        const children:Array<number> = [];
        this._getChildIndices(i).forEach( (childIndex:number) => {
            if(childIndex <= this._vals.length - 1){
                children.push(this._vals[childIndex]);
            }
        });
        return children;
    }

    private _getChildIndices(i:number):Array<number>{
        return [
            2*i + 1,
            2*i + 2
        ];
    }
    getSize():number{
        return this._vals.length;
    }
    getVals():Array<number>{
        return this._vals;
    }

    _compare(val0:number, val1:number):boolean{
        if(this._type === HeapType.MIN){
            return val0 < val1;
        }
        return val0 > val1;
    }

    checkHeapProperty(index:number):boolean{
        const val:number = this._vals[index];
        const children:Array<number> = this.getChildren(index);
        const incorrectChildren:Array<number> = children.filter((child:number) => {
            return !this._compare(val, child);
        });
        return incorrectChildren.length === 0;
    }

    insert(val:number){
        // put in the next slot
        const currentLength = this._vals.length;
        this._vals.push(val);
        let index:number = currentLength;
        let parentIndex:number = this._getParentIndex(index);
        while(parentIndex >= 0 && !this.checkHeapProperty(parentIndex)){
            // bubble up
            this._swapElementsAt(index, parentIndex);
            index = parentIndex;
            if(parentIndex === 0){
                // we have set the root
                parentIndex = -1;
            }
            else{
                parentIndex = this._getParentIndex(parentIndex);
            }
        }
    }

    get():number{
        if(this._vals.length === 0){
            return this._type === HeapType.MIN ? Infinity : -Infinity;
        }
        return this._vals[0];
    }

    remove():number{
        const root:number = this._vals[0];
        const last = this._vals[this._vals.length - 1];
        this._vals[0] = last;
        this._vals.pop();
        if(this._vals.length === 0){
            return root;
        }
        else{
            // bubble down
            let index = 0;
            while(!this.checkHeapProperty(index)){
                const children:Array<number> = this.getChildren(index);
                if(children.length === 0){
                    throw new Error("heap property failed");
                }
                else{
                    let childIndex:number;
                    if(children.length === 1 || (children.length === 2 && this._compare(children[0], children[1]))){
                        // left child
                        childIndex = this._getChildIndices(index)[0];
                    }
                    else{
                        // right child
                        childIndex = this._getChildIndices(index)[1];
                    }
                    this._swapElementsAt(index, childIndex);
                    index = childIndex;
                }
            }
            return root;
        }
    }
}
