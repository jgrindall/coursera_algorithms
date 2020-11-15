import * as _ from "lodash";

export enum HeapType{
    MIN = "min",
    MAX = "max"
};

export interface Value{
    val:number;
}

export class Heap<T extends Value>{

    private _elements:Array<T>;
    private _type:HeapType;

    constructor(elements:Array<T>, type:HeapType = HeapType.MIN){
        this._type = type;
        this._elements = (elements.length >= 1 ? [elements[0]] : []);
        if(elements.length >= 2){
            for(let i = 1; i < elements.length; i++){
                this.insert(elements[i]);
            }
        }
    }

    private _swapElementsAt(i:number, j:number){
        const t:T = this._elements[i];
        this._elements[i] = this._elements[j];
        this._elements[j] = t;
    }

    private _getParentIndex(i:number){
        return Math.floor((i - 1)/2);
    }

    getChildren(i:number):Array<T>{
        const children:Array<T> = [];
        this._getChildIndices(i).forEach( (childIndex:number) => {
            if(childIndex <= this._elements.length - 1){
                children.push(this._elements[childIndex]);
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
        return this._elements.length;
    }
    getVals():Array<T>{
        return this._elements;
    }

    _compare(elt0:T, elt1:T):boolean{
        const val0 = elt0.val, val1 = elt1.val;
        if(this._type === HeapType.MIN){
            return val0 < val1;
        }
        return val0 > val1;
    }

    checkHeapProperty(index:number):boolean{
        const elt:T = this._elements[index];
        const children:Array<T> = this.getChildren(index);
        const incorrectChildren:Array<T> = children.filter((child:T) => {
            return !this._compare(elt, child);
        });
        return incorrectChildren.length === 0;
    }

    insert(val:T){
        // put in the next slot
        const currentLength = this._elements.length;
        this._elements.push(val);
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

    get():T{
        if(this._elements.length === 0){
            return null;
        }
        return this._elements[0];
    }

    remove():T{
        const root:T = this._elements[0];
        const last = this._elements[this._elements.length - 1];
        this._elements[0] = last;
        this._elements.pop();
        if(this._elements.length === 0){
            return root;
        }
        else{
            // bubble down
            let index = 0;
            while(!this.checkHeapProperty(index)){
                const children:Array<T> = this.getChildren(index);
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
