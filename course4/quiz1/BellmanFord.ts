import { Hash, AdjList, WeightedEdge, prune } from "./AdjList";
import * as _ from "lodash";
import {SSPath, SSRecord} from "./Types";

export function pathEquals(ssPath1:SSPath, ssPath2:SSPath){
    return ssPath1.length === ssPath2.length && JSON.stringify(ssPath1.vertices) === JSON.stringify(ssPath2.vertices);
}

export function recordEquals(ssPath1:SSRecord, ssPath2:SSRecord){
    let equal = true;
    ssPath1.forEach((value, key)=>{
        if(!pathEquals(ssPath1.get(key), ssPath2.get(key))){
            equal = false;
        }
    });
    if(equal){
        ssPath2.forEach((value, key)=>{
            if(!pathEquals(ssPath1.get(key), ssPath2.get(key))){
                equal = false;
            }
        });
    }
    return equal;
}

function replacer(key, value) {
  if(value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

export class BellmanFord{
    private graph:AdjList;
    private solutions:SSRecord[];
    private nodes:string[];

    constructor(h:Hash){
        const pruned:Hash = prune(h);
        this.graph = new AdjList(pruned);
        this.nodes = this.graph.getNodes();
        this.solutions = [];
    }

    fill(i:number){
        if(i % 50 === 0){
            console.log(i);
        }
        this.solutions[i] = new Map<string, SSPath>();
        const prevSolution:SSRecord = this.solutions[i - 1];
        this.nodes.forEach(node=>{
            const case1:SSPath = prevSolution.get(node);
            const edges:WeightedEdge[] = this.graph.getEdgesInto(node);
            let minLength:number = Infinity;
            let minCase2:SSPath = null;
            edges.forEach(edge=>{
                const path0:SSPath = prevSolution.get(edge[0]);
                const newLength = path0.length + edge[2];
                if(newLength < minLength){
                    minLength = newLength;
                    minCase2 = {
                        vertices:[...path0.vertices, node],
                        length:newLength
                    };
                }

            });
            if(!minCase2 || case1.length <= minCase2.length){
                this.solutions[i].set(node, case1);
            }
            else{
                this.solutions[i].set(node, minCase2);
            }
        });
    }

    static getAPSP(h:Hash):Map<string, SSRecord>{
        const bf:BellmanFord = new BellmanFord(h);
        const nodes:string[] = bf.graph.getNodes();
        const apsp:Map<string, SSRecord> = new Map<string, SSRecord>();
        nodes.forEach(node=>{
            apsp.set(node, bf.getSSSP(node));
        });
        return apsp;
    }
    checkCycle(){
        const nodes = this.graph.getNodes();
        let n = nodes.length;
        if(!recordEquals(this.solutions[n - 1], this.solutions[n])){
            throw new Error("-ve cycle");
        }
    }
    getSSSP(source:string):SSRecord{
        const nodes = this.graph.getNodes();
        let n = nodes.length;
        this.solutions[0] = new Map<string, SSPath>();
        nodes.forEach(node=>{
            this.solutions[0].set(node, {
                vertices: (node === source ? [source] : []),
                length:(node === source ? 0 : Infinity)
            });
        });

        if(n >= 2){
            for(let i = 1; i <= n; i++){
                this.fill(i);
                if(i - 2 >= 0){
                    delete this.solutions[i - 2];
                }
            }
            this.checkCycle();
        }

        return this.solutions[n - 1];
    }

}
