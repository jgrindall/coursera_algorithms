import {MergeSort, Comparator} from "../../week1/MergeSort";

export type Point = [number, number];

export type PointPair = [Point, Point];

const coordComp = (i:number):Comparator<Point>=>{
    return (p:Point, q:Point)=>{
        return p[i] <= q[i];
    };
};

const xComp:Comparator<Point> = coordComp(0);

const yComp:Comparator<Point> = coordComp(1);

const avg = (pts:Array<Point>, coord:number):number=>{
    let sum = 0;
    for(let i = 0; i < pts.length; i++){
        sum += pts[i][coord];
    }
    return sum/pts.length;
};

const dist = (p:Point, q:Point) => {
    const dx = p[0] - q[0];
    const dy = p[1] - q[1];
    return Math.sqrt(dx*dx + dy*dy);
};

export class ClosestPoints{
    static getClosest(a:Array<Point>):PointPair{
        const px:Array<Point> = MergeSort.sort(a, xComp);
        const py:Array<Point> = MergeSort.sort(a, yComp);
        return ClosestPoints.rcp(px, py);
    }
    static bruteForce(p:Array<Point>):PointPair{
        let minDist = Infinity;
        let bestI = null, bestJ = null;
        for(let i = 0; i < p.length - 1; i++){
            for(let j = i + 1; j < p.length; j++){
                const d = dist(p[i], p[j]);
                if(d < minDist){
                    bestI = p[i];
                    bestJ = p[j];
                    minDist = d;
                }
            }
        }
        return [bestI, bestJ];
    }
    private static rcp(px:Array<Point>, py:Array<Point>):PointPair{
        const num = px.length;
        if(num <= 3){
            return ClosestPoints.bruteForce(px);
        }
        const numLeft = Math.ceil(num/2);
        const lx:Array<Point> = px.slice(0, numLeft);
        const rx:Array<Point> = px.slice(numLeft);
        const xbar = avg([lx[lx.length - 1], rx[0]], 0);
        const ly = py.filter(p => lx.includes(p));
        const ry = py.filter(p => rx.includes(p));
        const closestLeft:PointPair = ClosestPoints.rcp(lx, ly);
        const closestRight:PointPair = ClosestPoints.rcp(rx, ry);
        const distLeft = dist(closestLeft[0], closestLeft[1]);
        const distRight = dist(closestRight[0], closestRight[1]);
        const delta = Math.min(distLeft, distRight);
        const b = py.filter(p=>Math.abs(p[0] - xbar) < delta);
        let minDist = Infinity;
        let bestBI = null, bestBJ = null;
        for(let i = 0; i < b.length - 1; i++){
            for(let offset = 1; offset <= 7; offset++){
                let j = i + offset;
                if(b[i] && b[j]){
                    const d = dist(b[i], b[j]);
                    if(d < minDist){
                        bestBI = b[i];
                        bestBJ = b[j];
                        minDist = d;
                    }
                }
            }
        }
        if(minDist < delta){
            return [bestBI, bestBJ];
        }
        else if(distLeft < distRight){
            return closestLeft;
        }
        else{
            return closestRight;
        }
    }
}
