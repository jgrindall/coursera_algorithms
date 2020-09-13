import { AdjList } from "./AdjList";

class Cut{

}

export class MinCut{
    private graph:AdjList;

    constructor(graph:AdjList){
        this.graph = graph;
    }

    getMinCut():Cut{
        // choose an edge at random
        return new Cut();
    }
}
