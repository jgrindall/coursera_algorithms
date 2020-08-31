const swap = <T>(a:Array<T>, i:number, j:number): void => {
    const t:T = a[i];
    a[i] = a[j];
    a[j] = t;
};

export type Comparator<T> = (a:T, b:T) => boolean;

export class QuickSort{
    /**
      partition in place
    **/
    static partition<T>(a:Array<T>, c:Comparator<T>, l:number, r:number):number{
        const pivot = a[l];
        let i = l + 1;
        let j = l + 1;
        while(j < r + 1){
            const inspect = a[j];
            if(!c(inspect, pivot)){
                j++;
            }
            else{
                swap(a, i, j);
                i++;
                j++;
            }
        }
        swap(a, l, i - 1);
        return i - 1;
    }

    /**
      sort in place
    **/
    static sort<T>(a:Array<T>, c:Comparator<T>, l:number, r:number):void{
        if(r - l === 0){
            // already sorted;
        }
        else if(r - l === 1){
            if(!c(a[l], a[r])){
                swap(a, l, r);
            }
        }
        else{
            const pivotIndex:number = QuickSort.partition(a, c, l, r);
            if(pivotIndex > l){
                QuickSort.sort(a, c, l, pivotIndex - 1);
            }
            if(pivotIndex < r){
                QuickSort.sort(a, c, pivotIndex + 1, r);
            }
        }
    }
}
