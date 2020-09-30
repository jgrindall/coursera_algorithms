import {Heap, HeapType} from "./Heap";
import {MedianMaintainer} from "./MedianMaintainer";
import * as _ from 'lodash';
import fs from 'fs';

const _eq = (a:Array<number>, b:Array<number>):boolean=>{
    if(a.length !== b.length){
        return false;
    }
    for(let i = 0; i < a.length; i++){
        if(a[i] !== b[i]){
            return false;
        }
    }
    return true;
}

fs.readFile('./heap/med.txt', 'utf8', (err:any, data:string) => {
    if (err){
        throw err;
    }
    const lines = data.split('\n');
    const a:Array<number> = lines.map(line => parseInt(line));
    console.log(a[0]);
    console.log(_.last(a));
    const aSorted = [...a].sort((p, q) => p - q);
    console.log(_eq(aSorted, _.range(10000).map(i => i + 1)));
    let sum = 0;
    const m:MedianMaintainer = new MedianMaintainer();
    for(let i = 0; i < a.length; i++){
        m.add(a[i]);
        sum += m.getMedian();
        if(i % 1000 === 0){
            console.log("processed", i);
        }
    }
    console.log(sum);
    console.log(sum % 10000);

});
