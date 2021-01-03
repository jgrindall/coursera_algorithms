import { AdjList, WeightedEdge } from "./AdjList";
import * as _ from "lodash";
import {UnionFind} from "./UnionFind";

export type Cluster = Array<string>;

export class Clustering{
    private graph:AdjList;
    private unionFind:UnionFind;
    private spacing:number;

    constructor(graph:AdjList){
        this.graph = graph;
        this.unionFind = new UnionFind(this.graph.getNodes());
    }

    canAdd(edge:WeightedEdge):boolean{
        return this.unionFind.getLeader(edge[0]) !== this.unionFind.getLeader(edge[1]);
    }

    addEdge(edge:WeightedEdge){
        this.unionFind.union(edge[0], edge[1]);
    }

    getSpacing():number{
        return this.spacing;
    }

    getClusters(k:number):Array<Cluster>{
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
        let i, j;
        for(i = 0; i < edges.length; i++){
            const edge:WeightedEdge = edges[i];
            if(this.canAdd(edge)){
                this.addEdge(edge);
                if(this.unionFind.getNumComponents() <= k){
                    break;
                }
            }
        }
        for(j = i + 1; j < edges.length; j++){
            const edge:WeightedEdge = edges[j];
            if(this.canAdd(edge)){
                this.spacing = edge[2];
                break;
            }
        }
        const clusters = [];
        const components:Map<string, Cluster> = this.unionFind.getComponents();
        for (let comp of components.values()) {
            clusters.push(comp);
        }
        return clusters;
    }

}
