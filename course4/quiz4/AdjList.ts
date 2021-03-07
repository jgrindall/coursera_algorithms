import * as _ from "lodash";

export type Edge = [string, string];

export type Hash = {
    [key: string]: Array<string>
};

export class AdjList{

    private hash:Hash;

    constructor(hash?:Hash){
        this.hash = hash || {};
    }
    reverse():AdjList{
        const g = new AdjList({});
        const nodes = Object.keys(this.hash);
        nodes.forEach(node=>{
            g.addNode(node);
        });
        nodes.forEach(node=>{
            this.getNeighbours(node).forEach(endPoint=>{
                g.addEdge(endPoint, node);
            });
        });
        return g;
    }
    removeNode(nodeToRemove:string){
        const g = new AdjList({});
        const nodes = Object.keys(this.hash);
        nodes.forEach(node=>{
            if(node !== nodeToRemove){
                g.addNode(node);
            }
        });
        nodes.forEach(node=>{
            if(node !== nodeToRemove){
                this.getNeighbours(node).forEach(endPoint=>{
                    if(endPoint !== nodeToRemove){
                        g.addEdge(node, endPoint);
                    }
                });
            }
        });
        return g;
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
    hasEdge(node0:string, node1:string):boolean{
        return this.hash[node0] && this.hash[node0].includes(node1);
    }
    getHash():Hash{
        return this.hash;
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
        if(!this.hasEdge(node0, node1)){
            this.hash[node0].push(node1);
        }
    }
}
