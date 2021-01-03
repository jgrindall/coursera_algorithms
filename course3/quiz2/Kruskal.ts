import { Hash, AdjList, WeightedEdge } from "./AdjList";
import * as _ from "lodash";
import {UnionFind} from "./UnionFind";

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

export class Kruskal{
    private graph:AdjList;
    private unionFind:UnionFind;
    private mst:AdjList = new AdjList();

    constructor(graph:AdjList){
        this.graph = graph;
        this.unionFind = new UnionFind(this.graph.getNodes());
    }

    canAdd(edge:WeightedEdge):boolean{
        return this.unionFind.getLeader(edge[0]) !== this.unionFind.getLeader(edge[1]);
    }

    addEdge(edge:WeightedEdge){
        this.mst.addNode(edge[0]);
        this.mst.addNode(edge[1]);
        this.mst.addEdge(edge[0], edge[1], edge[2]);
        this.unionFind.union(edge[0], edge[1]);
    }

    getMST():AdjList{
        let edges:Array<WeightedEdge> = [];
        const nodes:Array<string> = this.graph.getNodes();
        nodes.forEach( (node:string)=>{
            edges = edges.concat(this.graph.getEdgesFrom(node));
        });
        edges = edges.sort((a:WeightedEdge, b:WeightedEdge)=>{
            const weightA = a[2];
            const weightB = b[2];
            if(weightA === weightB){
                return 0;
            }
            return (weightA < weightB ? -1 : 1);
        });
        edges.forEach(edge=>{
            if(this.canAdd(edge)){
                this.addEdge(edge);
            }
        });
        return this.mst;
    }

}
