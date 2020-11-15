import { Hash, AdjList, WeightedEdge } from "./AdjList";
import {Heap, HeapType} from "./Heap";
import * as _ from "lodash";

export class Node{
    vertex:number;
    val:number;

    constructor(_vertex:number, _val:number){
        this.vertex = _vertex;
        this.val = _val;
    }
}

export const getTotalWeightAdv = (hash:Hash):number=>{
    let totalWeight:number = 0;
    Object.keys(hash).forEach(key=>{
        const edges = hash[key];
        edges.forEach(edge=>{
            totalWeight += edge[2];
        });
    });
    return totalWeight
};

export class PrimAdv{
    private graph:AdjList;
    private heap:Heap<Node>;

    constructor(graph:AdjList){
        this.graph = graph;
        this.heap = new Heap<Node>([]);
        // insert into heap
    }

    _getMinEdge(arr1:Array<string>, arr2:Array<string>):WeightedEdge{

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
