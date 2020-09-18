const swap = <T>(a:Array<T>, i:number, j:number): void => {
    if(i === j){
        return;
    }
    const t:T = a[i];
    a[i] = a[j];
    a[j] = t;
};

export type Comparator<T> = (a:T, b:T) => boolean;

export const median = (a:number, b:number, c:number):number =>{
    if (a <= b){
        if (c <= a){
            return a;
        }
        else if(c >= b){
            return b;
        }
        else{
            return c;
        }
    }
    else{
        if (c <= b){
            return b;
        }
        else if(c >= a){
            return a;
        }
        else{
            return c;
        }
    }
};

export interface PivotCalc<T>{
    getPivotIndex(l:number, r:number, a:Array<T>):number;
}

export class LeftPivot<T> implements PivotCalc<T>{
    getPivotIndex(l:number, r:number, a:Array<T>):number{
        return l;
    }
}

export class RightPivot<T> implements PivotCalc<T>{
    getPivotIndex(l:number, r:number, a:Array<T>):number{
        return r;
    }
}

export class RandomPivot<T> implements PivotCalc<T>{
    getPivotIndex(l:number, r:number, a:Array<T>):number{
        return l + Math.floor(Math.random()*(r - l + 1));
    }
}

export class NumericMedianPivot implements PivotCalc<number>{
    getPivotIndex(l:number, r:number, a:Array<number>):number{
        const index0:number = l, index1:number = ((r - l) % 2 === 0) ? (l + (r - l)/2) : (l + (r - l - 1)/2), index2 = r;
        const med = median(a[index0], a[index1], a[index2]);
        return (med === a[index0] ? index0 : (med === a[index1] ? index1 : index2));
    }
}

export class QuickSort<T>{

    private pivotCalc: PivotCalc<T>;
    private arr: Array<T>;
    private comparator:Comparator<T>;
    public numComp:number;

    constructor(arr: Array<T>, comparator:Comparator<T>){
        this.arr = arr;
        this.numComp = 0;
        this.pivotCalc = new LeftPivot<T>();
        this.comparator = comparator;
    }

    setPivotCalc(f:PivotCalc<T>):void{
        this.pivotCalc = f;
    }

    /**
      partition in place
    **/
     partition(l:number, r:number):number{
        const pivotIndex:number = this.pivotCalc.getPivotIndex(l, r, this.arr); // get the pivot and move it to the first place
        swap(this.arr, l, pivotIndex);
        const pivot = this.arr[l];
        let i = l + 1;
        let j = l + 1;
        while(j < r + 1){
            const inspect:T = this.arr[j];
            if(!this.comparator(inspect, pivot)){
                j++;
            }
            else{
                swap(this.arr, i, j);
                i++;
                j++;
            }
        }
        swap(this.arr, l, i - 1);
        return i - 1;
    }

    /**
      sort in place
    **/
    sort(l:number, r:number):void{
        if(l < r){
            const pivotIndex:number = this.partition(l, r);
            if(pivotIndex > l){
                this.numComp += (pivotIndex - l);
                this.sort(l, pivotIndex - 1);
            }
            if(pivotIndex < r){
                this.numComp += (r - pivotIndex);
                this.sort(pivotIndex + 1, r);
            }
        }
    }
}
