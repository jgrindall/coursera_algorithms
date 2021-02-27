import { Hash, AdjList, WeightedEdge } from "./AdjList";
import * as _ from "lodash";

export function countOnes (n:number) {
    var count = 0;
    while (n != 0){
        n = n & (n - 1);
        count++;
    }
    return count;
}

export type SubsetDefinition = number;

export function getSubsets(N:number):Map<number, SubsetDefinition[]>{
    const powNMinusOne = Math.pow(2, N - 1);
    const powN = 2*powNMinusOne;
    var a = [];
    for(let i = 0; i < powN; i++){
        a[i] = i;
    }
    const min = powNMinusOne;
    a = a.filter(n=> n >= min);
    var grouped = new Map<number, number[]>();
    for(var i = 0; i < a.length; i++){
        const count = countOnes(a[i]);
        let group = grouped.get(count);
        if(!group){
            group = [];
            grouped.set(count, group);
        }
        group.push(a[i]);
    }
    return grouped;
}

export function getElements(s:SubsetDefinition, N:number):number[]{
    let elements = [];
    let power:number = N;
    let mask = 1;
    while(power >= 1){
        if(s & mask){
            elements.push(power);
        }
        power--;
        mask *= 2;
    }
    return elements;
}

export function removeElement(n:SubsetDefinition, N:number, e:number):SubsetDefinition{
    const mask = Math.pow(2, N) - 1 - Math.pow(2, N - e);
    return n & mask;
}

export class TSP{
    private graph:AdjList;
    private nodes:string[];
    private numNodes:number;
    private solutions:Map<SubsetDefinition, Map<number, number>>;
    private subsets:Map<number, SubsetDefinition[]>;

    constructor(h:Hash){
        this.graph = new AdjList(h);
        this.nodes = this.graph.getNodes();
        this.numNodes = this.nodes.length;
        this.solutions = new Map<SubsetDefinition, Map<number, number>>();
        console.log("build", this.numNodes);
        this.subsets = getSubsets(this.numNodes);
        console.log("build done");
    }
    getEdgeWeight(i:number, j:number){
        return this.graph.getEdge(i + "", j + "")[2];
    }
    get(s:SubsetDefinition, j:number):number{
        if(j === 1){
            return (s === Math.pow(2, this.numNodes - 1) ? 0 : Infinity);
        }
        const map = this.solutions.get(s);
        return map.get(j);
    }
    set(s:SubsetDefinition, j:number, v:number){
        let map:Map<number, number> = this.solutions.get(s);
        if(typeof map === "undefined"){
            map = new Map<number, number>();
            this.solutions.set(s, map);
        }
        map.set(j, v);
    }
    getSubsetsOfSize(m:number):number[]{
        return this.subsets.get(m);
    }
    fillUsingSize(m:number){
        console.log("fill", m);
        const subsets:number[] = this.getSubsetsOfSize(m);
        subsets.forEach( (subset:SubsetDefinition) => {
            const elements = getElements(subset, this.numNodes);
            elements.forEach((j:number)=>{
                if(j !== 1){
                    let min = Infinity;
                    elements.forEach((k:number)=>{
                        if(k !== j){
                            const strRemoved:SubsetDefinition = removeElement(subset, this.numNodes, j);
                            const len = this.get(strRemoved, k) + this.getEdgeWeight(k, j);
                            if(len < min){
                                min = len;
                            }
                        }
                    });
                    this.set(subset, j, min);
                }
            });
        });
    }
    prune(m:number){
        const keys:SubsetDefinition[] = [...this.solutions.keys()];
        keys.forEach(key=>{
            if(getElements(key, this.numNodes).length <= m - 1){
                this.solutions.delete(key);
            }
        });
    }
    solve():number{
        for(let m = 2; m <= this.numNodes; m++){
            this.fillUsingSize(m);
            this.prune(m);
        }
        const subset:SubsetDefinition = Math.pow(2, this.numNodes) - 1;
        const map = this.solutions.get(subset);
        let min = Infinity;
        for(let j = 2; j <= this.numNodes; j++){
            const len = map.get(j) + this.getEdgeWeight(j, 1);
            if(len < min){
                min = len;
            }
        }
        return min;
    }
}
