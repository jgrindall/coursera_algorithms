import {Heap, HeapType} from "./Heap";

export class MedianMaintainer{

    private _low:Heap;
    private _high:Heap;

    constructor(){
        this._low = new Heap([], HeapType.MAX);
        this._high = new Heap([], HeapType.MIN);
    }

    getMedian():number{
        let lenLow:number = this._low.getSize();
        let lenHigh:number = this._high.getSize();
        const maxLow:number = this._low.get();
        const minHigh:number = this._high.get();
        if(lenLow === lenHigh){
            return maxLow;
        }
        else if(lenLow === lenHigh + 1){
            return maxLow;
        }
        if(lenLow === lenHigh - 1){
            return minHigh;
        }
        else{
            throw new Error("incorrect heaps");
        }
    }

    getSizes(){
        return [
            this._low.getSize(),
            this._high.getSize()
        ];
    }

    add(n:number):void{
        let lenLow:number = this._low.getSize();
        let lenHigh:number = this._high.getSize();
        const maxLow:number = this._low.get();
        const minHigh:number = this._low.get();
        if(n < maxLow){
            this._low.insert(n);
            lenLow++;
        }
        else if(n > minHigh){
            this._high.insert(n);
            lenHigh++;

        }
        else{
            if(lenLow <= lenHigh){
                this._low.insert(n);
                lenLow++;
            }
            else{
                this._high.insert(n);
                lenHigh++;
            }
        }
        // rebalance
        if(lenLow === lenHigh + 2){
            // move highest from low to high
            const toMove = this._low.remove();
            this._high.insert(toMove);
        }
        else if(lenLow === lenHigh - 2){
            // move lowest from high to low
            const toMove = this._high.remove();
            this._low.insert(toMove);
        }
    }
}
