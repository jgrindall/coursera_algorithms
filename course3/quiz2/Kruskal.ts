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

export class UnionFind{
    private nodesToLeaders:Map<string, string> = new Map<string, string>();
    private leadersToNodes:Map<string, Array<string>> = new Map<string, Array<string>>();

    constructor(nodes:Array<string>){
        nodes.forEach( (node:string)=>{
            this.nodesToLeaders.set(node, node);
            this.leadersToNodes.set(node, [node]);
        });
        console.log('nodesToLeaders', this.nodesToLeaders);
        console.log('leadersToNodes', this.leadersToNodes);
    }

    public getComponent(leader:string):Array<string>{
        return this.leadersToNodes.get(leader);
    }

    public union(node0:string, node1:string){
        console.log("union", node0, node1);

        console.log("before");
        console.log('nodesToLeaders', this.nodesToLeaders);
        console.log('leadersToNodes', this.leadersToNodes);

        const leader0 = this.getLeader(node0);
        const leader1 = this.getLeader(node1);
        if(leader0 === leader1){
            throw new Error("cannot union, already union");
        }
        console.log("leaders", leader0, leader1);
        const component0:Array<string> = this.leadersToNodes.get(leader0);
        const component1:Array<string> = this.leadersToNodes.get(leader1);
        console.log('comps', component0, component1);
        let small:Array<string>, large:Array<string>;
        let smallLeader:string, largeLeader:string;
        if(component0.length < component1.length){
            small = component0;
            smallLeader = leader0;
            large = component1;
            largeLeader = leader1;
        }
        else{
            small = component1;
            smallLeader = leader1;
            large = component0;
            largeLeader = leader0;
        }
        small.forEach(node=>{
            this.nodesToLeaders.set(node, largeLeader);
        });
        this.leadersToNodes.set(smallLeader, []);
        this.leadersToNodes.set(largeLeader, large.concat(small));
        console.log("now");
        console.log('nodesToLeaders', this.nodesToLeaders);
        console.log('leadersToNodes', this.leadersToNodes);
    }

    public getLeader(node:string):string{
        return this.nodesToLeaders.get(node);
    }

}

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
