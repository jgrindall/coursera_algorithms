import { AdjList, Edge, Hash } from "./AdjList";
import * as _ from "lodash";

export type Cut = {
    a:Array<string>,
    b:Array<string>,
    count:number
}

export class MinCut{
    private graph:AdjList;

    constructor(graph:AdjList){
        this.graph = graph;
    }

    getMinCut():Cut{
        const n = Object.keys(this.graph.getHash()).length;
        // make n^2 ln n checks
        const numChecks = Math.ceil(n*n*Math.log(n));
        console.log("doing", numChecks);
        let minCut:Cut = null, minCount = Infinity;
        for(let i = 1; i <= numChecks; i++){
            if(i % 100 === 0){
                console.log('#' + (100*i/numChecks) + "%");
            }
            const cut:Cut = this.getCut();
            if(cut.count < minCount){
                minCut = cut;
                minCount = cut.count;
                console.log(i, "found", minCount);
            }
        }
        return minCut;
    }

    getCut():Cut{
        // choose an edge at random
        let g = this.graph.clone();
        while(g.getAllEdges().length >= 3){
            const edge:Edge = g.getRandomEdge();
             g = g.contract(edge[0], edge[1]);
         }
        const hash:Hash = g.getHash();
        const keys:Array<string> = Object.keys(hash);
        const nodesA = keys[0].split(',');
        const nodesB = keys[1].split(',');
        const edgesAB = this.graph.getAllEdges().filter(edge => {
            return nodesA.includes(edge[0]) && nodesB.includes(edge[1]);
        });
        return {
            a: nodesA,
            b: nodesB,
            count: edgesAB.length
        };
    }
}
