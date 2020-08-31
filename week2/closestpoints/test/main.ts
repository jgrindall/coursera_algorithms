import * as chai from 'chai';
import {ClosestPoints, Point, PointPair} from "../ClosestPoints";
let expect = chai.expect;

const eq = (p:Point, q:Point):boolean=>{
    return p[0] === q[0] && p[1] === q[1];
};

const match = (pp0:PointPair, pp1:PointPair):boolean=>{
    return (eq(pp0[0], pp1[0]) && eq(pp0[1], pp1[1])) || (eq(pp0[0], pp1[1]) && eq(pp0[1], pp1[0]));
};

describe("test", () => {

    it("check basic", () =>{
        const pt = ():Point=>{
            return [Math.random()*5, Math.random()*5];
        };
        for (let i = 0; i < 20; i++){
            const a:Array<Point> = [
                pt(),
                pt(),
                pt(),
                pt()
            ];
            const bruteForce = ClosestPoints.bruteForce(a);
            const ans = ClosestPoints.getClosest(a);
            expect(match(ans, bruteForce)).to.equal(true);
        }

    });

    it("check random", () =>{
        const num = 100;
        for (let i = 0; i < 20; i++){
            const a:Array<Point> = [];
            for(let j = 0; j < num; j++){
                a.push([Math.random(), Math.random()]);
            }
            const bruteForce = ClosestPoints.bruteForce(a);
            const ans = ClosestPoints.getClosest(a);
            expect(match(ans, bruteForce)).to.equal(true);
        }
    });

});
