import { AdjList, Edge, Hash } from "./AdjList";
import * as _ from "lodash";
import {Stack} from "./Stack";
import {Components, Progress, ExploredType} from "./Types";

export class Scc{
    private graph:AdjList;

    constructor(graph:AdjList){
        this.graph = graph;
    }

    getFinishingTimes():Progress{
        // first, reverse the graph's edges
        const gRev = this.graph.reverse();
        const nodes = gRev.getNodes();
        const progress:Progress = {};
        // mark all unexplored
        nodes.forEach((node:string)=>{
            progress[node] = {
                explored: ExploredType.UNEXPLORED
            };
        });
        let finishingTime:number = 0;
        const visit = (node:string)=>{
            const stack = new Stack<string>();
            stack.push(node);
            while(!stack.isEmpty()){
                const node = stack.peek();
                progress[node].explored = ExploredType.EXPLORED;
                const neighbours = gRev.getNeighbours(node);
                const unexploredNeighbours = neighbours.filter(neighbour => (progress[neighbour].explored === ExploredType.UNEXPLORED));
                if(unexploredNeighbours.length >= 1){
                    stack.push(unexploredNeighbours[0]);
                }
                else{
                    stack.pop();
                    progress[node].finishingTime = finishingTime;
                    finishingTime++;
                }
            }
        };
        for(let i = nodes.length - 1; i >= 0; i--){
            const node = nodes[i];
            if(progress[node].explored === ExploredType.UNEXPLORED){
                visit(node);
            }
        }
        return progress;
    }

    getSourceVertices():Progress{
        const finishingTimes:Progress = this.getFinishingTimes();
        const nodes = this.graph.getNodes();
        // mark all unexplored
        const progress:Progress = {};
        nodes.forEach((node:string)=>{
            progress[node] = {
                explored: ExploredType.UNEXPLORED
            };
        });
        const orderedNodes = _.sortBy(nodes, (node)=>{
            return finishingTimes[node].finishingTime;
        });
        let source:string = "";
        const visit = (node:string)=>{
            const stack = new Stack<string>();
            stack.push(node);
            while(!stack.isEmpty()){
                const currentNode = stack.pop();
                if(progress[currentNode].explored !== ExploredType.EXPLORED){
                    progress[currentNode].explored = ExploredType.EXPLORED;
                    progress[currentNode].source = source;
                    const neighbours = this.graph.getNeighbours(currentNode);
                    neighbours.forEach((neighbour:string)=>{
                        stack.push(neighbour);
                    });
                }
            }
        };
        // iterate in the order defined by the finishing times of gRev
        for(let i = orderedNodes.length - 1; i >= 0; i--){
            const node = orderedNodes[i];
            if(progress[node].explored !== ExploredType.EXPLORED){
                source = node;
                visit(node);
            }
        }
        return progress;
    }

    getScc():Components{
        const sources:Progress = this.getSourceVertices();
        const components = {};
        Object.keys(sources).forEach(node=>{
            const source = sources[node].source;
            components[source] = components[source] || [];
            components[source].push(node);
        });
        return components;
    }

}
