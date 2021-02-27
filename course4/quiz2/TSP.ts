import { Hash, AdjList, WeightedEdge } from "./AdjList";
import * as _ from "lodash";

const _eq = (a:Array<number>, b:Array<number>):boolean=>{
    if(a.length !== b.length){
        return false;
    }
    for(let i = 0; i < a.length; i++){
        if(a[i] !== b[i]){
            return false;
        }
    }
    return true;
};

export const getSubsetsOfSize = (a:number, b:number, m:number):number[][]=>{
    // return all subsets of  a...b that have m elements
    if(a > b){
        throw new Error("a <= b");
    }
    else if(a === b){
        if(m === 0){
            return [];
        }
        else if(m === 1){
            return [
                [a]
            ];
        }
        else{
            throw new Error("incorrect params");
        }
    }
    else if(m === 0){
        return [];
    }
    else if(m === 1){
        return _.range(a, b + 1).map(i => [i]);
    }
    let results:number[][] = [];
    for(let smallest:number = a; smallest <= b - (m - 1); smallest++){
        let usingSmallest:number[][] = getSubsetsOfSize(smallest + 1, b, m - 1);
        usingSmallest = usingSmallest.map((subset:number[])=>{
            return [smallest, ...subset];
        });
        results = results.concat(usingSmallest);
    }
    return results;
};

export const getSubsetsOfSizeThatContainA = (a:number, b:number, m:number):number[][]=>{
    if(m === 1){
        return [
            [a]
        ];
    }
    const subsets = getSubsetsOfSize(a + 1, b, m - 1);
    return subsets.map((subset:number[])=>{
        return [a, ...subset];
    });
}

export const getAllSubsetsThatContainA = (a:number, b:number):number[][]=>{
    let results:number[][] = [];
    for(let m = 1; m <= b - a + 1; m++){
        results = results.concat(getSubsetsOfSizeThatContainA(a, b, m));
    }
    return results;
};

export class TSP{
    private graph:AdjList;
    private nodes:string[];
    private numNodes:number;
    private solutions:Map<string, Map<number, number>>;

    constructor(h:Hash){
        this.graph = new AdjList(h);
        this.nodes = this.graph.getNodes();
        this.numNodes = this.nodes.length;
        this.solutions = new Map<string, Map<number, number>>();
    }
    toString(s:number[]):string{
        return s.join(",");
    }
    removeFromSet(s:string, n:number):string{
        const subset:number[] = s.split(",").map(n => parseInt(n));
        return this.toString(_.without(subset, n));
    }
    getEdgeWeight(i:number, j:number){
        return this.graph.getEdge(i + "", j + "")[2];
    }
    fillUsingSize(m:number){
        const subsets:number[][] = getSubsetsOfSizeThatContainA(1, this.numNodes, m);

        subsets.forEach( (subset:number[]) =>{
            const str:string = this.toString(subset);
            const map:Map<number, number> = this.solutions.get(str);
            subset.forEach((j:number)=>{
                if(j !== 1){
                    let min = Infinity;
                    subset.forEach((k:number)=>{
                        if(k !== j){
                            const map = this.solutions.get(this.removeFromSet(str, j));
                            const len = map.get(k) + this.getEdgeWeight(k, j);
                            if(len < min){
                                min = len;
                            }
                        }
                    });
                    map.set(j, min);
                }
            });
        });
    }
    solve():number{
        const allSubsets:number[][] = getAllSubsetsThatContainA(1, this.numNodes);
        allSubsets.forEach(subset=>{
            const map:Map<number, number> = new Map<number, number>();
            map.set(1, _eq(subset, [1]) ? 0 : Infinity);
            this.solutions.set(this.toString(subset), map);
        });
        for(let m = 2; m <= this.numNodes; m++){
            this.fillUsingSize(m);
        }
        const subset:string = this.toString(_.range(1, this.numNodes + 1));
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
