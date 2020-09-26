import {AdjList} from "./AdjList";
import {Dijkstra} from "./Dijkstra";
import * as _ from 'lodash';
import {Paths, PathItem} from "./Types";
import fs from 'fs';

fs.readFile('./dijkstra/dijk.txt', 'utf8', (err:any, data:string) => {
    if (err){
        throw err;
    }
    const lines = data.split('\n');
    const SEP = " ";
    const g:AdjList = new AdjList();
    console.log('building graph...');
    lines.forEach(line=>{
        line = line.replace(/\s+/g, SEP);
        const items = _.compact(line.split(SEP));
        const start = items[0] + "";
        g.addNode(start);
        for(let i = 1; i < items.length; i++){
            const item = items[i];
            const split = item.split(",");
            g.addEdge(start, split[0] + "", parseInt(split[1]));
        }
    });
    console.log('processing graph...');
    const paths:Paths = new Dijkstra(g).getShortestPaths('1');
    const toReport = [7,37,59,82,99,115,133,165,188,197];
    const lengthsToReport = [];
    toReport.forEach(rep=>{
        const len = paths[rep + ''].length;
        console.log(rep, len);
        lengthsToReport.push(len);
    });
    console.log(lengthsToReport);
});
