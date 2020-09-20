import { AdjList, Edge, Hash } from "./AdjList";
import * as _ from "lodash";
import {Stack} from "./Stack";
import {Component, Progress, ExploredType} from "./Types";

export class Dfs{
    private graph:AdjList;

    constructor(graph:AdjList){
        this.graph = graph;
    }

    isAcyclic():boolean{
        try{
            this.getTopologicalOrder();
            return true;
        }
        catch(e){
            return false;
        }
    }

    getTopologicalOrder():Progress{
        const nodes = this.graph.getNodes();
        const progress:Progress = {};
        nodes.forEach((node:string)=>{
            progress[node] = {
                explored: ExploredType.UNEXPLORED
            };
        });
        let currentLabel:number = nodes.length;
        const visit = (node:string)=>{
            if(progress[node].explored === ExploredType.EXPLORED){
                return;
            }
            else if(progress[node].explored === ExploredType.EXPLORING){
                throw new Error("Found a cycle");
            }
            else{
                progress[node].explored = ExploredType.EXPLORING;
                const neighbours = this.graph.getNeighbours(node);
                neighbours.forEach(visit);
                progress[node].explored = ExploredType.EXPLORED;
                progress[node].label = currentLabel;
                currentLabel--;
            }
        };
        nodes.forEach(visit);
        return progress;
    }

    getConnectedComponents():Array<Component>{
        const progress:Progress = {};
        const nodes = this.graph.getNodes();
        const components:Array<Component> = [];
        nodes.forEach((node:string)=>{
            progress[node] = {
                explored: ExploredType.UNEXPLORED
            };
        });
        nodes.forEach(node=>{
            if(progress[node].explored === ExploredType.UNEXPLORED){
                progress[node].explored = ExploredType.EXPLORED;
                const newComponent:Component = [node];
                const stack = new Stack<string>();
                stack.push(node);
                while(!stack.isEmpty()){
                    const node = stack.pop();
                    const neighbours = this.graph.getNeighbours(node);
                    const unexploredNeighbours:Array<string> = neighbours.filter(neighbour => progress[neighbour].explored === ExploredType.UNEXPLORED);
                    unexploredNeighbours.forEach((unexplored:string)=>{
                        newComponent.push(unexplored);
                        progress[unexplored].explored = ExploredType.EXPLORED;
                        stack.push(unexplored);
                    });
                }
                progress[node].explored = ExploredType.EXPLORED;
                components.push(newComponent);
            }
        });
        return components;
    }

}
