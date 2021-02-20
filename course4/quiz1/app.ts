
import * as _ from 'lodash';
import fs from 'fs';
import {Hash} from './AdjList';
import {BellmanFord, SSRecord} from './BellmanFord';
import {FloydWarshall, SSPath} from './FloydWarshall';

const _process = (file:string)=>{

    fs.readFile(file, 'utf8', (err:any, data:any) => {
        if (err){
            throw err;
        }
        const lines = data.split('\n');
        lines.shift();
        const SEP = " ";
        const g:Hash = {};
        const nodes:string[] = [];
        let numEdges = 0;
        lines.forEach(line=>{
            line = line.replace(/\s+/g, SEP);
            const items:string[] = _.compact(line.split(SEP));
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
};

//_process('./quiz1/g1.txt');


fs.readFile('./quiz1/g1.txt', 'utf8', (err:any, data:any) => {
    if (err){
        throw err;
    }
    const lines = data.split('\n');
    lines.shift();
    const SEP = " ";
    const g:Hash = {};
    const nodes:string[] = [];
    let numEdges = 0;
    lines.forEach(line=>{
        line = line.replace(/\s+/g, SEP);
        const items:string[] = _.compact(line.split(SEP));
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
    const fw:Map<string, SSPath> = new FloydWarshall(g).getAPSP();
    console.log(fw);
    //expect(pathEquals(fw.get("1-1"), {vertices:["1"], length:0})).to.equal(true);

});
