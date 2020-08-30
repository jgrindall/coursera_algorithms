const swap = (a:Array<number>, i:number, j:number):void=>{
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
};

export class QuickSort{
    /**
      partition in place
    **/
    static partition(a:Array<number>, l:number, r:number):number{
        const pivot = a[l];
        let i = l + 1;
        let j = l + 1;
        while(j < r + 1){
            const inspect = a[j];
            if(inspect > pivot){
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
    static sort(a:Array<number>, l:number, r:number):void{
        if(r - l === 0){
            // already sorted;
        }
        else if(r - l === 1){
            if(a[l] > a[r]){
                swap(a, l, r);
            }
        }
        else{
            const pivotIndex:number = QuickSort.partition(a, l, r);
            if(pivotIndex > l){
                QuickSort.sort(a, l, pivotIndex - 1);
            }
            if(pivotIndex < r){
                QuickSort.sort(a, pivotIndex + 1, r);
            }
        }
    }
}
