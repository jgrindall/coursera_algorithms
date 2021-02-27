import { Hash, AdjList, WeightedEdge, prune } from "./AdjList";
import {BellmanFord} from "./BellmanFord";
import {Dijkstra} from "./Dijkstra";
import {SSPath, SSRecord} from "./Types";
import * as _ from "lodash";

const newNode:string = "NEW";

export class Johnson{
    private hash:Hash;
    private graph:AdjList;

    private augmentedHash:Hash;

    private adjustedHash:Hash;
    private adjustedGraph:AdjList;

    private nodes:string[];
    private pValues: Map<string, number>;

    constructor(h:Hash){
        this.hash = prune(h);
        this.graph = new AdjList(this.hash);
        this.nodes = this.graph.getNodes();
        this.augmentedHash = JSON.parse(this.graph.toString()) as Hash;
        this.augmentedHash[newNode] = [];
        this.nodes.forEach(node=>{
            this.augmentedHash[newNode].push([newNode, node, 0]);
        });
    }
    adjustGraph(){
        this.adjustedHash = {};
        const bf:BellmanFord = new BellmanFord(this.augmentedHash);
        const record:SSRecord = bf.getSSSP(newNode); // throws
        this.pValues = new Map<string, number>();
        this.nodes.forEach(node=>{
            const path:SSPath = record.get(node);
            this.pValues.set(node, path.length);
        });
        this.nodes.forEach(node=>{
            const edges:WeightedEdge[] = this.hash[node];
            const adjustedEdges:WeightedEdge[] = edges.map(edge=>{
                const newEdge:WeightedEdge = [
                    edge[0],
                    edge[1],
                    edge[2] + this.pValues.get(edge[0]) - this.pValues.get(edge[1])
                ];
                return newEdge;
            });
            this.adjustedHash[node] = adjustedEdges;
        });
        this.adjustedGraph = new AdjList(this.adjustedHash);
    }
    getMinSP():SSPath{
        const nodes = this.graph.getNodes();
        const apsp:Map<string, SSPath> = this.getAPSP();
        let minLength = Infinity;
        let minPath:SSPath = null;
        nodes.forEach(nodeI=>{
            nodes.forEach(nodeJ=>{
                const path:SSPath = apsp.get(nodeI + "-" + nodeJ);
                if(path.length < minLength){
                    minLength = path.length;
                    minPath = path;
                }
            });
        });
        return minPath;
    }
    getAPSP():SSRecord{
        const result:Map<string, SSPath> = new Map<string, SSPath>();
        console.log('adjust');
        this.adjustGraph();
        console.log('use d');
        const dijkstra:Dijkstra = new Dijkstra(this.adjustedGraph, {storeVertices: false});
        this.nodes.forEach(nodeI=>{
            console.log('i', nodeI);
            // this is slow
            const d:SSRecord = dijkstra.getShortestPaths(nodeI);
            console.log('i done', nodeI);
            this.nodes.forEach(nodeJ=>{
                if(d[nodeJ]){
                    const reweight:SSPath = {
                        vertices:d[nodeJ].vertices,
                        length:d[nodeJ].length - this.pValues.get(nodeI) + this.pValues.get(nodeJ)
                    };
                    result.set(nodeI + "-" + nodeJ, reweight);
                }
                else{
                    result.set(nodeI + "-" + nodeJ, {vertices:[], length:Infinity});
                }

            });
        });
        return result;

    }
    getAdjustedHash():Hash{
        return this.adjustedHash;
    }
    getAugmentedHash():Hash{
        return this.augmentedHash;
    }
}
