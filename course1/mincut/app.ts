import {AdjList} from "./AdjList";
import {MinCut, Cut} from "./MinCut";
import * as _ from 'lodash';
import fs from 'fs';

fs.readFile('input.txt', 'utf8', (err:any, data:string) => {
    if (err){
        throw err;
    }
    const lines = data.split('\n');
    const SEP = ",";
    const hash = {};
    lines.forEach(line=>{
        line = line.replace(/\s+/g, SEP);
        const items = _.compact(line.split(SEP));
        const key = items[0] + "";
        items.shift();
        hash[key] = items.map(i => "" + i);
    });
    const g:AdjList = new AdjList(hash);
    const c:Cut = new MinCut(g).getMinCut();
    console.log(c.count);
});
