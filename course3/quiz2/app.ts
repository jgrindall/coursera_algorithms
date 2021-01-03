
import * as _ from 'lodash';
import fs from 'fs';
import {AdjList} from './AdjList';
import {Kruskal, getTotalWeight} from './Kruskal';
import {Cluster, Clustering} from './Clustering';

fs.readFile('./quiz2/cluster1.txt', 'utf8', (err:any, data:string) => {
    if (err){
        throw err;
    }
    const g:AdjList = new AdjList();
    const lines = data.split('\n');
    lines.forEach((line:string, i:number)=>{
        if(i >= 1){
            const parts:Array<string> = line.split(' ');
            //console.log(parts);
            g.addNode(parts[0]);
            g.addNode(parts[1]);
        }
    });
    lines.forEach((line:string, i:number)=>{
        if(i >= 1){
            const parts:Array<string> = line.split(' ').map(s => s.trim());
            g.addEdge(parts[0], parts[1], parseInt(parts[2]));
            g.addEdge(parts[1], parts[0], parseInt(parts[2]));
        }
    });
    const clustering:Clustering = new Clustering(g);
    const clusters:Array<Cluster> = clustering.getClusters(4);
    console.log('clusters', clusters.length, clustering.getSpacing());
    console.log(clusters);

    // find the spacing


});
