import { AdjList, Edge, Hash } from "./AdjList";
import * as _ from "lodash";
import {Queue} from "./Queue";

type ProgressItem = {
    explored:boolean,
    dist?:number
};

export type Component = Array<string>;

type Progress = {
    [key: string]: ProgressItem
};

export class Bfs{
    private graph:AdjList;

    constructor(graph:AdjList){
        this.graph = graph;
    }

    getConnectedComponents():Array<Component>{
        const progress:Progress = {};
        const components:Array<Component> = [];
        this.graph.getNodes().forEach((node:string)=>{
            progress[node] = {
                explored: false
            };
        });
        const nodes = this.graph.getNodes();
        nodes.forEach(node=>{
            if(!progress[node].explored){
                // get the component
                const newComponent:Component = [];
                const queue = new Queue<string>();
                queue.push(node);
                while(!queue.isEmpty()){
                    const node = queue.pop();
                    const neighbours = this.graph.getNeighbours(node);
                    const unexploredNeighbours:Array<string> = neighbours.filter(neighbour => !progress[neighbour].explored);
                    unexploredNeighbours.forEach((unexplored:string)=>{
                        newComponent.push(unexplored);
                        progress[unexplored].explored = true;
                        queue.push(unexplored);
                    });
                }
                components.push(newComponent);
            }
        });
        return components;
    }

    getDist(p:string, q:string):number{
        if(p === q){
            return 0;
        }
        const progress:Progress = {};
        this.graph.getNodes().forEach((node:string)=>{
            progress[node] = {
                explored: (node === p),
                dist: (node === p ? 0 : Infinity)
            };
        });
        const queue = new Queue<string>();
        queue.push(p);
        while(!queue.isEmpty()){
            const node = queue.pop();
            const neighbours = this.graph.getNeighbours(node);
            const unexploredNeighbours:Array<string> = neighbours.filter(neighbour => !progress[neighbour].explored);
            unexploredNeighbours.forEach((unexplored:string)=>{
                progress[unexplored].explored = true;
                progress[unexplored].dist = progress[node].dist + 1;
                queue.push(unexplored);
            });
        }

        return progress[q].dist;
    }

}
