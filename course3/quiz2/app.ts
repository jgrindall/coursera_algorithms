
import * as _ from 'lodash';
import fs from 'fs';
import {AdjList} from './AdjList';
import {Cluster, Clustering} from './Clustering';
import {UnionFind} from "./UnionFind";

fs.readFile('./quiz2/cluster1.txt', 'utf8', (err:any, data:string) => {
    if (err){
        throw err;
    }
    const g:AdjList = new AdjList();
    const lines = data.split('\n');
    lines.forEach((line:string, i:number)=>{
        if(i >= 1){
            const parts:Array<string> = line.split(' ');
            if(parts.length >= 3){
                g.addNode(parts[0]);
                g.addNode(parts[1]);
            }
        }
    });
    lines.forEach((line:string, i:number)=>{
        if(i >= 1){
            const parts:Array<string> = line.split(' ').map(s => s.trim());
            if(parts.length >= 3){
                g.addEdge(parts[0], parts[1], parseInt(parts[2]));
                g.addEdge(parts[1], parts[0], parseInt(parts[2]));
            }
        }
    });
    const clustering:Clustering = new Clustering(g);
    const clusters:Array<Cluster> = clustering.getClusters(4);
    console.log('clusters', clusters.length, clustering.getSpacing());
    console.log(clusters);
});

const flip = (s:string, i:number):string=>{
    const a = s.split('');
    a[i] = (a[i] === "0" ? "1" : "0");
    return a.join('');
};

fs.readFile('./quiz2/cluster2.txt', 'utf8', (err:any, data:string) => {
    const NUM_DIGITS:number = 24;
    if (err){
        throw err;
    }
    const lines = data.split('\n').map(s=>s.trim().replace(/ /g, ''));
    const deDup = Array.from(new Set(lines));
    const unionFind = new UnionFind(deDup);
    console.log("single flip");
    deDup.forEach(node=>{
        _.range(0, NUM_DIGITS).forEach(index=>{
            const s = flip(node, index);
            if(unionFind.contains(s)){
                unionFind.union(node, s);
            }
        });
    });
    console.log("double flip");
    deDup.forEach(node=>{
        _.range(0, NUM_DIGITS - 1).forEach(index0=>{
            _.range(index0, NUM_DIGITS).forEach(index1=>{
                const s = flip(flip(node, index0), index1);
                if(unionFind.contains(s)){
                    unionFind.union(node, s);
                }
            });
        });
    });

    console.log(unionFind.getNumComponents());

});
