import { Hash, AdjList, WeightedEdge } from "./AdjList";
import {Heap, HeapType} from "./Heap";
import * as _ from "lodash";

export class Node{
    vertex:string;
    val:number;
    edge:WeightedEdge;

    constructor(_vertex:string, _val:number, _edge:WeightedEdge){
        this.vertex = _vertex;
        this.val = _val;
        this.edge = _edge;
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
    private mst:AdjList;
    private vertices:Array<string>;

    constructor(graph:AdjList){
        this.graph = graph;
        this.heap = new Heap<Node>([]);
        this.mst = new AdjList();
    }

    buildHeap(){
        const nodes = this.graph.getNodes();
        const startingNode:string = nodes[0];
        const edges:Array<WeightedEdge> = this.graph.getEdgesFrom(startingNode);
        edges.forEach((edge:WeightedEdge)=>{
            this.heap.insert(new Node(edge[1], edge[2], edge));
        });
    }

    add(){
        const nodeToAdd:Node = this.heap.remove();
        const edge:WeightedEdge = nodeToAdd.edge;
        this.mst.addNode(edge[0]);
        this.mst.addNode(edge[1]);
        this.mst.addEdge(edge[0], edge[1], edge[2]);
        this.vertices.push(edge[1]);
        //maintain heap invariant
        const neighbours:Array<WeightedEdge> = this.graph.getEdgesFrom(edge[1]);
        const neighbourVertices:Array<string> = neighbours.map(edge=>edge[1]);
        neighbourVertices.forEach((vertex:string)=>{
            if(!this.vertices.includes(vertex)){
                // remove it and add it again
                this.heap.remove();
            }
        });
    }

    getMST():AdjList{
        const numNodes = this.graph.getNodes().length;
        this.vertices = [];
        this.buildHeap();
        while(this.vertices.length < numNodes){
            this.add();
        }
        return this.mst;
    }

}
