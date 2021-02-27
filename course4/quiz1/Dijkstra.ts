import { AdjList} from "./AdjList";
import * as _ from "lodash";
import {SSRecord, SSPath} from "./Types";

export class Dijkstra{
    private graph:AdjList;

    private options:any;

    constructor(graph:AdjList, options:any = {storeVertices: true}){
        this.graph = graph;
        this.options = _.defaults(options || {}, {storeVertices: true});
    }

    getShortestPaths(node:string):SSRecord{
        let paths:SSRecord = new Map<string, SSPath>();
        const storeVertices = this.options.storeVertices;
        paths[node] = {
            length:0,
            vertices:[node]
        };
        //optimized for speed
        let processedList:Array<string> = [node];
        let processedHash:Map<string, boolean> = new Map<string, boolean>();
        processedHash.set(node, true);
        const enlarge = ()=>{
            let minLength = Infinity;
            let vw:[string, string, number] = ['', '', 0];
            processedList.forEach(v=>{
                const neighbours:Array<string> = this.graph.getNeighbours(v);
                neighbours.forEach(w=>{
                    if(!processedHash.has(w)){
                        // candidate
                        const length = paths[v].length + this.graph.getWeight(v, w);
                        if(length < minLength){
                            minLength = length;
                            vw = [v, w, length];
                        }
                    }
                });
            });
            if(minLength === Infinity){
                return false;
            }
            processedList.push(vw[1]);
            processedHash.set(vw[1], true);
            const pathItem:SSPath = paths[vw[0]];
            paths[vw[1]] = {
                length:minLength,
                vertices: storeVertices ? [...pathItem.vertices, vw[1]] : []
            };
            return true;
        };
        while(true){
            const success = enlarge();
            if(!success){
                break;
            }
        }
        return paths;
    }

}
