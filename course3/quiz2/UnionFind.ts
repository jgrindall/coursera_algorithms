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
    private numComponents:number;

    constructor(nodes:Array<string>){
        nodes.forEach( (node:string)=>{
            this.nodesToLeaders.set(node, node);
            this.leadersToNodes.set(node, [node]);
        });
        this.numComponents = nodes.length;
    }

    public getComponents():Map<string, Array<string>>{
        const comp:Map<string, Array<string>> = new Map<string, Array<string>>();
        for (let key of this.leadersToNodes.keys()) {
            const value = this.leadersToNodes.get(key);
            if(value.length >= 1){
                comp.set(key, this.leadersToNodes.get(key));
            }
        }
        return comp;
    }

    public getComponent(leader:string):Array<string>{
        return this.leadersToNodes.get(leader);
    }

    public getNumComponents():number{
        return this.numComponents;
    }

    public union(node0:string, node1:string){
        const leader0 = this.getLeader(node0);
        const leader1 = this.getLeader(node1);
        if(leader0 === leader1){
            throw new Error("cannot union, already union");
        }
        const component0:Array<string> = this.leadersToNodes.get(leader0);
        const component1:Array<string> = this.leadersToNodes.get(leader1);
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
        this.numComponents--;
    }

    public getLeader(node:string):string{
        return this.nodesToLeaders.get(node);
    }

}
