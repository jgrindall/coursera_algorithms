import { AdjList, WeightedEdge, Hash } from "./AdjList";
import * as _ from "lodash";
import {Paths, PathItem} from "./Types";

export class Dijkstra{
    private graph:AdjList;

    constructor(graph:AdjList){
        this.graph = graph;
    }

    getShortestPaths(node:string):Paths{
        let paths:Paths = {};
        let nodes = this.graph.getNodes();
        paths[node] = {
            length:0,
            route:[node]
        };
        let processed:Array<string> = [node];
        const enlarge = ()=>{
            let minLength = Infinity;
            let vw:[string, string, number] = ['', '', 0];
            processed.forEach(v=>{
                const neighbours:Array<string> = this.graph.getNeighbours(v);
                neighbours.forEach(w=>{
                    if(!processed.includes(w)){
                        // candidate
                        const length = paths[v].length + this.graph.getWeight(v, w);
                        if(length < minLength){
                            minLength = length;
                            vw = [v, w, length];
                        }
                    }
                });
            });
            processed.push(vw[1]);
            const pathItem:PathItem = paths[vw[0]];
            paths[vw[1]] = {
                length:minLength,
                route:[...pathItem.route, vw[1]]
            };
        };
        while(processed.length < nodes.length){
            enlarge();
        }
        return paths;
    }

}
