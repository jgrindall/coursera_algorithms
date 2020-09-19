import * as _ from "lodash";

export type Edge = [string, string];

export type Hash = {
    [key: string]: Array<string>
};

export class AdjList{

    private hash:Hash;
    private m:number;

    constructor(hash?:Hash){
        this.hash = hash || {};
        this.m = 0;
        Object.keys(this.hash).forEach(node=>{
            this.m += this.hash[node].length;
        });
    }
    getNodes(){
        return Object.keys(this.hash);
    }
    setHash(hash:Hash):void{
        this.hash = hash;
    }
    addNode(a:string):void{
        if(this.hash[a]){
            throw new Error(a + ' already exists');
        }
        this.hash[a] = [];
    }
    getHash():Hash{
        return this.hash;
    }
    getNumEdges():number{
        return this.m;
    }
    getNeighbours(a:string):Array<string>{
        return this.hash[a];
    }
    getAllEdges():Array<Edge>{
        const edges = [];
        const nodes = Object.keys(this.hash);
        nodes.forEach(node=>{
            this.hash[node].forEach(otherNode =>{
                edges.push([node, otherNode]);
            });
        });
        return edges;
    }
    clone():AdjList{
        return new AdjList(JSON.parse(JSON.stringify(this.getHash())));
    }
    addEdge(node0:string, node1:string):void{
        if(!this.hash[node0].includes(node1)){
            this.hash[node0].push(node1);
            this.m++;
        }
    }
}
