import { AdjList, Edge, Hash } from "./AdjList";
import * as _ from "lodash";

export class Dfs{
    private graph:AdjList;

    constructor(graph:AdjList){
        this.graph = graph;
    }

    getDist(p:string, q:string):number{
        return 0;
    }

}
