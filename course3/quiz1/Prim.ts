import { Hash, AdjList, WeightedEdge } from "./AdjList";
import * as _ from "lodash";

export const getTotalWeight = (hash:Hash):number=>{    
    let totalWeight:number = 0;
    Object.keys(hash).forEach(key=>{
        const edges = hash[key];
        edges.forEach(edge=>{
            totalWeight += edge[2];
        });
    });
    return totalWeight
};

export class Prim{
    private graph:AdjList;

    constructor(graph:AdjList){
        this.graph = graph;
    }

    _getMinEdge(arr1:Array<string>, arr2:Array<string>):WeightedEdge{
        let minLength:number = Infinity;
        let minEdge:WeightedEdge = null;
        for(let i = 0; i < arr1.length; i++){
            for(let j = 0; j < arr2.length; j++){
                const edge:WeightedEdge = this.graph.getEdge(arr1[i], arr2[j]);
                if(edge && edge[2] < minLength){
                    minLength = edge[2];
                    minEdge = edge;
                }
            }
        }
        return minEdge;
    }

    getMST():AdjList{
        let nodesOut:Array<string> = this.graph.getNodes();
        const nodesIn:Array<string> = [];
        const mst:AdjList = new AdjList();
        const startingNode:string = nodesOut[0];
        nodesIn.push(startingNode);
        nodesOut = _.without(nodesOut, startingNode);
        while(nodesOut.length >= 1){
            const edge:WeightedEdge = this._getMinEdge(nodesIn, nodesOut);
            mst.addNode(edge[0]);
            mst.addNode(edge[1]);
            mst.addEdge(edge[0], edge[1], edge[2]);
            nodesIn.push(edge[1]);
            nodesOut = _.without(nodesOut, edge[1]);
        }
        return mst;
    }

}
