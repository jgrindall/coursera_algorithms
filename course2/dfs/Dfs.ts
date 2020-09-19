import { AdjList, Edge, Hash } from "./AdjList";
import * as _ from "lodash";
import {Stack} from "./Stack";
import {ProgressItem, Component, Progress} from "./Types";

export class Dfs{
    private graph:AdjList;

    constructor(graph:AdjList){
        this.graph = graph;
    }

    static isAcyclic(g:AdjList):boolean{
        //Use integer array to tag current status of node: i.e. 0 --means this
        //node hasn't been visited before. -1 -- means this node has been visited, and its
        //children nodes are being visited. 1 -- means this node has been visited, and it'
        //done. So if a node's status is -1 while doing DFS, it means there must be a cycle existed.

    }

    getTopologicalOrder():Progress{
        const nodes = this.graph.getNodes();
        const progress:Progress = {};
        nodes.forEach((node:string)=>{
            progress[node] = {
                explored: false
            };
        });
        let currentLabel = nodes.length;
        nodes.forEach(node=>{
            if(!progress[node].explored){
                const stack = new Stack<string>();
                stack.push(node);
                while(!stack.isEmpty()){
                    const node = stack.pop();
                    const neighbours = this.graph.getNeighbours(node);
                    const unexploredNeighbours:Array<string> = neighbours.filter(neighbour => !progress[neighbour].explored);
                    unexploredNeighbours.forEach((unexplored:string)=>{
                        progress[unexplored].explored = true;
                        stack.push(unexplored);
                    });
                }
                progress[node].label = currentLabel;
                currentLabel--;
            }
        });
        return progress;
    }

    getConnectedComponents():Array<Component>{
        const progress:Progress = {};
        const nodes = this.graph.getNodes();
        const components:Array<Component> = [];
        nodes.forEach((node:string)=>{
            progress[node] = {
                explored: false
            };
        });
        nodes.forEach(node=>{
            if(!progress[node].explored){
                // get the component
                const newComponent:Component = [];
                const stack = new Stack<string>();
                stack.push(node);
                while(!stack.isEmpty()){
                    const node = stack.pop();
                    const neighbours = this.graph.getNeighbours(node);
                    const unexploredNeighbours:Array<string> = neighbours.filter(neighbour => !progress[neighbour].explored);
                    unexploredNeighbours.forEach((unexplored:string)=>{
                        newComponent.push(unexplored);
                        progress[unexplored].explored = true;
                        stack.push(unexplored);
                    });
                }
                components.push(newComponent);
            }
        });
        return components;
    }

}
