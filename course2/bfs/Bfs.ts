import { AdjList, Edge, Hash } from "./AdjList";
import * as _ from "lodash";

export class Bfs{
    private graph:AdjList;

    constructor(graph:AdjList){
        this.graph = graph;
    }

    getDist(p:string, q:string):number{
        return 0;
    }

}
