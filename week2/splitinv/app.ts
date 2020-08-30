import {InversionCounter, Comparator} from "./InversionCounter";

const comp:Comparator<number> = {
    isLessThanOrEq:(a:number, b:number):boolean => {
        return a <= b;
    }
};

const ans = InversionCounter.sortAndCount([5,7,3,8,9,5,7,3,2,4,6,8,6,4,8,1], comp);
console.log(ans);
