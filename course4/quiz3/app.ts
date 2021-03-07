
import * as _ from 'lodash';
import fs from 'fs';

import {TSP} from './TSP';
import {Hash} from './AdjList';
import {Point} from './Types';

const process = (file:string)=>{

    fs.readFile(file, 'utf8', (err:any, data:any) => {
        if (err){
            throw err;
        }
        const lines = data.split('\n');
        lines.shift();
        const SEP = " ";
        const g:Hash = {};
        const positions:Point[] = [];
        lines.forEach( (line:string) =>{
            line = line.replace(/\s+/g, SEP);
            const items:string[] = _.compact(line.split(SEP));
            const x = parseFloat(items[1]);
            const y = parseFloat(items[2]);
            positions.push({x, y})
        });
        console.log(new TSP(positions).solve());
    });

};

process('./quiz3/tsp.txt');
