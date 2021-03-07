import * as _ from "lodash";
import {Point} from './Types';

export class TSP{
    private positions:Point[];

    constructor(p:Point[]){
        this.positions = p;
    }
    dist(i:number, j:number):number{
        const p0:Point = this.positions[i];
        const p1:Point = this.positions[j];
        const dx = p0.x - p1.x;
        const dy = p0.y - p1.y;
        return (Math.sqrt(dx*dx + dy*dy));
    };
    solve():number{
        const visited:number[] = [];
        let unvisited:number[] = _.range(0, this.positions.length);
        let nodeToVisit:number = 0;
        let totalLength:number = 0;
        while(unvisited.length >= 1){
            visited.push(nodeToVisit);
            if(visited.length % 500 === 0){
                console.log(visited.length, unvisited.length, totalLength);
            }
            unvisited = _.without(unvisited, nodeToVisit);
            let minDist:number = Infinity;
            let minIndex:number = -1;
            unvisited.forEach(j=>{
                const d = this.dist(nodeToVisit, j);
                if(d < minDist){
                    minDist = d;
                    minIndex = j;
                }
            });
            if(minIndex >= 0){
                totalLength += minDist;
                nodeToVisit = minIndex;
            }
        }
        console.log("visited", visited[0], visited[1], visited[2], "...", visited[visited.length - 2], visited[visited.length - 1]);
        return totalLength + this.dist(0, visited[visited.length - 1]);
    }
}
