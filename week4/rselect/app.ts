import {RSelect, Comparator} from "./RSelect";
import fs from 'fs';

const comp:Comparator<number> = (a:number, b:number):boolean => {
    return a <= b;
};

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let rs = new RSelect<number>(comp);
console.assert(rs.getOrderStat(arr, 3) === 3);
