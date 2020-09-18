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

export class RSelect<T>{

    private pivotCalc: PivotCalc<T>;
    private comparator:Comparator<T>;

    constructor(comparator:Comparator<T>){
        this.pivotCalc = new LeftPivot<T>();
        this.comparator = comparator;
    }

    setPivotCalc(f:PivotCalc<T>):void{
        this.pivotCalc = f;
    }

    /**
      partition in place
    **/
     partition(arr:Array<T>):number{
         const l = 0, r = arr.length - 1;
         const pivotIndex:number = this.pivotCalc.getPivotIndex(l, r, arr); // get the pivot and move it to the first place
         swap(arr, l, pivotIndex);
         const pivot = arr[l];
         let i = l + 1;
         let j = l + 1;
         while(j < r + 1){
             const inspect:T = arr[j];
             if(!this.comparator(inspect, pivot)){
                 j++;
             }
             else{
                 swap(arr, i, j);
                 i++;
                 j++;
             }
         }
         swap(arr, l, i - 1);
         return i - 1;
    }

    /**
      sort in place
    **/
    getOrderStat(arr:Array<T>, i:number):T{
        const len = arr.length;
        //console.log('in ', arr, 'find order stat', i);
        if(i < 0 || i > len - 1){
            throw new Error("cannot find ith in len" +  i + "," + len);
        }
        if(len === 1){
            return arr[0];
        }
        const pivotIndex:number = this.partition(arr);
        //console.log("pivotIndex", pivotIndex, 'a is now', arr);
        if(pivotIndex === i){
            return arr[i];
        }
        else if(pivotIndex < i){
            return this.getOrderStat(arr.slice(pivotIndex + 1), i - pivotIndex - 1);
        }
        else{
            return this.getOrderStat(arr.slice(0, pivotIndex), i);
        }
    }
}
