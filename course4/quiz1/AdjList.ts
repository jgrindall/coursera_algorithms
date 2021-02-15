import * as _ from "lodash";

export type WeightedEdge = [string, string, number];

export type Hash = {
    [key: string]: Array<WeightedEdge>
};

export function prune(h:Hash):Hash{
    const nodes = Object.keys(h);
    const newHash:Hash = {};
    for(let i = 0; i < nodes.length; i++){
        const keyI = nodes[i];
        newHash[keyI] = [];
        for(let j = 0; j < nodes.length; j++){
            const keyJ = nodes[j];
            if(i !== j){
                const edgesIJ = h[keyI].filter(edge => edge[1] === keyJ).sort((a:WeightedEdge, b:WeightedEdge)=>{
                    if(a[2] === b[2]){
                        return 0;
                    }
                    return a[2] < b[2] ? -1 : 1;
                });
                if(edgesIJ.length >= 1){
                    newHash[keyI].push(edgesIJ[0]);
                }
            }
        }
    }
    return newHash;
}

export class AdjList{

    private hash:Hash;
    private cachedEdgesIn:Map<string, WeightedEdge[]>;

    constructor(hash?:Hash){
        this.hash = hash || {};
        this.cachedEdgesIn = new Map<string, WeightedEdge[]>();
    }
    getNodes(){
        return Object.keys(this.hash);
    }
    setHash(hash:Hash):void{
        this.hash = hash;
    }
    addNode(a:string):void{
        this.hash[a] = this.hash[a] || [];
    }
    getDegree(node:string){
        return this.hash[node].length;
    }
    getHash():Hash{
        return this.hash;
    }
    getWeight(node0:string, node1:string):number{
        const edge:WeightedEdge = this.getEdge(node0, node1);
        return edge[2];
    }
    getEdgesIJ(node0:string, node1:string):WeightedEdge[]{
         const outOfNodeI = this.hash[node0];
         return outOfNodeI.filter(edge => edge[1] === node1);
    }
    getEdge(node0:string, node1:string):WeightedEdge{
        return this.hash[node0].find(edge => edge[1] === node1);
    }
    hasEdge(node0:string, node1:string):boolean{
        if(!this.hash[node0]){
            return false;
        }
        return !!this.hash[node0].find(edge => edge[1] === node1);
    }
    getNeighbours(a:string):Array<string>{
        return this.hash[a].map((e:WeightedEdge) => e[1]);
    }
    getEdgesInto(a:string):Array<WeightedEdge>{
        if(this.cachedEdgesIn.has(a)){
            return this.cachedEdgesIn.get(a);
        }
        const edgesInto: Array<WeightedEdge> = [];
        this.getNodes().forEach(node=>{
            const edges = this.hash[node];
            edges.forEach(edge=>{
                if(edge[1] === a){
                    edgesInto.push(edge);
                }
            });
        });
        this.cachedEdgesIn.set(a, edgesInto);
        return edgesInto;
    }
    getEdgesFrom(a:string):Array<WeightedEdge>{
        return this.hash[a];
    }
    addEdge(node0:string, node1:string, length:number):void{
        if(!this.hasEdge(node0, node1)){
            this.hash[node0].push([node0, node1, length]);
        }
    }
    toString():string{
        return JSON.stringify(this.hash, null, 2);
    }
}
