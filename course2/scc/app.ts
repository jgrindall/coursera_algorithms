import {AdjList} from "./AdjList";
import {Scc} from "./Scc";
import * as _ from 'lodash';
import {Progress, Components} from "./Types";
import fs from 'fs';

fs.readFile('./scc/scc.txt', 'utf8', (err:any, data:string) => {
    if (err){
        throw err;
    }
    const lines = data.split('\n');
    const SEP = " ";
    const g:AdjList = new AdjList();
    console.log('building graph...');
    let max = -Infinity;
    lines.forEach(line=>{
        line = line.replace(/\s+/g, SEP);
        const items = _.compact(line.split(SEP));
        const start = items[0] + "";
        const end = items[1] + "";
        g.addNode(start);
        g.addEdge(start, end);
        max = Math.max(max, parseInt(start));
    });

    console.log('add missing');

    let i:number = 0;

    for(i = 1; i <= max; i++){
        g.addNode(i + '');
    }

    const isolatedNodes:Array<string> = [];
    for(i = 1; i <= max; i++){
        const neighbours = g.getNeighbours(i + '');
        if(neighbours.length === 0){
            isolatedNodes.push(i + '');
        }
    }

    console.log(isolatedNodes.length, 'isolatedNodes');

    console.log(g.getNodes().length, "nodes");
    console.log('finding scc...');
    const scc:Components = new Scc(g).getScc();
    const sources = Object.keys(scc);
    const lengths:Array<number> = [];
    sources.forEach(source=>{
        lengths.push(scc[source].length);
    });

    lengths.sort( (a:number, b:number)=> a - b).reverse();

    console.log(lengths.slice(0, 10));



});
