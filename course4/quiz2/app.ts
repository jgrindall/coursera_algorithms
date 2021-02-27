
import * as _ from 'lodash';
import fs from 'fs';

import {TSP} from './TSP';
import {Hash} from './AdjList';

type Point = {x:number, y:number};

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
            const x = parseFloat(items[0]);
            const y = parseFloat(items[1]);
            positions.push({x, y})
        });
        const dist = (i:number, j:number):number=>{
            const p0:Point = positions[i - 1];
            const p1:Point = positions[j - 1];
            const dx = p0.x - p1.x;
            const dy = p0.y - p1.y;
            return (Math.sqrt(dx*dx + dy*dy));
        };
        for(let i = 1; i <= positions.length; i++){
            g["" + i] = [];
            for(let j = 1; j <= positions.length; j++){
                if(i !== j){
                    g["" + i].push(
                        ["" + i, "" + j, dist(i, j)]
                    );
                }
            }
        }
        console.log(new TSP(g).solve());
    });

};

process('./quiz2/tsp.txt');
