import { Hash, AdjList, WeightedEdge, prune } from "./AdjList";
import * as _ from "lodash";

export type SSPath = {
    vertices:string[],
    length:number
};

export type APSPRecord = Map<number, Map<string, SSPath>>;

export function pathEquals(ssPath1:SSPath, ssPath2:SSPath){
    return ssPath1.length === ssPath2.length && JSON.stringify(ssPath1.vertices) === JSON.stringify(ssPath2.vertices);
}

function replacer(key, value) {
  if(value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()),
    };
  } else {
    return value;
  }
}

export class FloydWarshall{
    private graph:AdjList;
    private solutions:APSPRecord;
    private nodes:string[];

    constructor(h:Hash){
        const pruned:Hash = prune(h);
        this.graph = new AdjList(pruned);
        this.nodes = this.graph.getNodes();
        this.solutions = new Map<number, Map<string, SSPath>>();
    }
    getVal(i:number, j:number, k:number):SSPath{
        return this.solutions.get(k).get(this.nodes[i] + "-" + this.nodes[j]);
    }
    setVal(i:number, j:number, k:number, val:SSPath){
        this.solutions.get(k).set(this.nodes[i] + "-" + this.nodes[j], val);
    }
    fill(k:number){
        const nodes = this.graph.getNodes();
        let n = nodes.length;
        for(let i = 0; i < n; i++){
            for(let j = 0; j < n; j++){
                // using the first 'k' nodes 0...k-1
                const case1 = this.getVal(i, j, k - 1); // use node k-1 nodes, do not use 'k-1'
                const case2_1 = this.getVal(i, k - 1, k - 1); // from i to k-1
                const case2_2 = this.getVal(k - 1, j, k - 1); //k-1 to j
                if(case1.length <= case2_1.length + case2_2.length){
                    this.setVal(i, j, k, {
                        vertices:[...case1.vertices],
                        length:case1.length
                    });
                }
                else{
                    const case1_clone = [...case2_1.vertices];
                    case1_clone.pop(); // i->k and k->j
                    const joinedPath = [...case1_clone, ...case2_2.vertices];
                    this.setVal(i, j, k, {
                        vertices:joinedPath,
                        length:case2_1.length + case2_2.length
                    });
                }
            }
        }
    }
    checkCycle(){
        const nodes = this.graph.getNodes();
        let n = nodes.length;
        if(n >= 3){
            for(let i = 0; i < n; i++){
                if(this.getVal(i, i, n).length < 0){
                    throw new Error("-ve cycle");
                }
            }
        }
        else if(n === 2){
            if(this.getVal(0, 1, 0).length + this.getVal(1, 0, 0).length < 0){
                throw new Error("-ve cycle");
            }
        }
    }
    getAPSP():Map<string, SSPath>{
        const nodes = this.graph.getNodes();
        let n = nodes.length;
        for(let k = 0; k <= n; k++){
            this.solutions.set(k, new Map<string, SSPath>());
        }
        for(let i = 0; i < n; i++){
            for(let j = 0; j < n; j++){
                let vertices:string[];
                let length:number = 0;
                const nodeI:string = this.nodes[i];
                const nodeJ:string = this.nodes[j];
                if(i === j){
                    vertices = [nodeI];
                    length = 0;
                }
                else{
                    const edgeIJ = this.graph.getEdge(nodeI, nodeJ);
                    if(edgeIJ){
                        vertices = [nodeI, nodeJ];
                        length = edgeIJ[2];
                    }
                    else{
                        vertices = [];
                        length = Infinity;
                    }
                }
                this.setVal(i, j, 0, {
                    vertices:vertices,
                    length:length
                });
            }
        }
        if(n > 2){
            for(let k = 1; k <= n; k++){
                if(k % 20 === 0){
                    console.log("k", k);
                }
                this.fill(k);
                this.solutions.delete(k - 2);
            }
            this.checkCycle();
            return this.solutions.get(n);
        }
        else{
            this.checkCycle();
            return this.solutions.get(0);
        }
    }
}
