import {QuickSort, Comparator} from "./QuickSort";
const comp:Comparator<number> = (a:number, b:number):boolean => {
    return a <= b;
};
const ans = QuickSort.sort([1, 3, 2], comp, 0, 2);
console.log(ans);
