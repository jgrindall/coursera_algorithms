import * as _ from 'lodash';
import fs from 'fs';
import {SumCount} from "./SumCount";

fs.readFile('./hash/sum.txt', 'utf8', (err:any, data:string) => {
    if (err){
        throw err;
    }
    const lines = data.split('\n');
    let vals:Array<number> = [];
    lines.forEach(line=>{
        line = line.replace(/\s+/g, '');
        let n:number = parseInt(line);
        if(!isNaN(n)){
            vals.push(n);
        }
    });
    vals = _.uniq(vals);

    console.log('processing...', vals.length, 'vals');
    const sc:SumCount = new SumCount(vals, 10000);
    const result = sc.start();
    /*
    Object.keys(result).forEach(key=>{
        const intKey = parseInt(key);
        console.log(intKey + ":" + result[key][0] + "...");
    });
    */
    console.log(Object.keys(result).length);
});
