import * as _ from "lodash";

export type Edge = [string, string];

export type Hash = {
    [key: string]: Array<string>
};

export class AdjList{

    private hash:Hash;
    private n:number;
    private m:number;

    constructor(hash?:Hash){
        this.hash = hash || {};
        this.n = Object.keys(this.hash).length;
        this.m = 0;
        Object.keys(this.hash).forEach(node=>{
            this.m += this.hash[node].length;
        });
    }
    getNodeName(n0:string, n1:string){
        const nodes0 = n0.split(','), nodes1 = n1.split(',');
        return (nodes0.concat(nodes1)).join(',');
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
    getRandomEdge():Edge{
        const node:string = _.sample(Object.keys(this.hash));
        return [
            node,
            _.sample(this.hash[node])
        ];
    }
    getNumEdges():number{
        return this.m;
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
    contract(e0:string, e1:string):AdjList{
        const newGraph = new AdjList();
        const nodes = Object.keys(this.hash);
        nodes.forEach(node=>{
            if(node !== e0 && node !== e1){
                newGraph.addNode(node);
            }
        });
        const newNode = this.getNodeName(e0, e1);
        newGraph.addNode(newNode);
        nodes.forEach(node=>{
            this.hash[node].forEach(otherNode => {
                if((node === e0 && otherNode === e1) || (node === e1 && otherNode === e0)){
                    // nothing
                }
                else if(node === e0 || node === e1){
                    newGraph.addEdge(newNode, otherNode);
                }
                else if(otherNode === e0 || otherNode === e1){
                    newGraph.addEdge(node, newNode);
                }
                else{
                    newGraph.addEdge(node, otherNode);
                }
            });
        });
        return newGraph;
    }
    addEdge(node0:string, node1:string):void{
        if(!this.hash[node0].includes(node1)){
            this.hash[node0].push(node1);
            this.m++;
        }
    }
}
