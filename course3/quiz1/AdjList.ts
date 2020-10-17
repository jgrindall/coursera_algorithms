import * as _ from "lodash";

export type WeightedEdge = [string, string, number];

export type Hash = {
    [key: string]: Array<WeightedEdge>
};

export class AdjList{

    private hash:Hash;

    constructor(hash?:Hash){
        this.hash = hash || {};
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
        const edge:WeightedEdge = this.hash[node0].find(edge => edge[1] === node1);
        return edge[2];
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
    addEdge(node0:string, node1:string, length:number):void{
        if(!this.hasEdge(node0, node1)){
            this.hash[node0].push([node0, node1, length]);
        }
    }
    toString():string{
        return JSON.stringify(this.hash, null, 2);
    }
}
