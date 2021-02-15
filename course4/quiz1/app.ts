
import * as _ from 'lodash';
import fs from 'fs';
import {Hash, AdjList, prune} from './AdjList';
import {BellmanFord, SSRecord, recordEquals, pathEquals} from './BellmanFord';

fs.readFile('./quiz1/g1.txt', 'utf8', (err:any, data:string) => {
    if (err){
        throw err;
    }
    const lines = data.split('\n');
    lines.shift();
    const SEP = " ";
    const g:Hash = {};
    console.log('building graph...');
    const nodes:string[] = [];
    let numEdges = 0;
    lines.forEach(line=>{
        line = line.replace(/\s+/g, SEP);
        const items = _.compact(line.split(SEP));
        const start = items[0] + "";
        const end = items[1] + "";
        const weight = parseInt(items[2]);
        g[start] = g[start] || [];
        g[start].push([start, end, weight]);
        numEdges++;
        if(!nodes.includes(start)){
            nodes.push(start)
        }
        if(!nodes.includes(end)){
            nodes.push(end)
        }
    });
    nodes.forEach(node=>{
        if(!g[node]){
            g[node] = [];
        }
    });
    console.log(Object.keys(g).length, "nodes");
    console.log(numEdges, "edges");
    const bf:SSRecord = new BellmanFord(g).getSSSP("1");

});
