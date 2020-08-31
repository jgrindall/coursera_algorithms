import * as chai from 'chai';
import {ClosestPoints, Point} from "../ClosestPoints";
let expect = chai.expect;

describe("description", () => {

    it("check", () =>{
        const a:Array<Point> = [];
        const num = 100;
        for(let i = 0; i < num; i++){
            const p:Point = [Math.random(), Math.random()];
            a.push(p);
        }
        const bruteForce = ClosestPoints.bruteForce(a);
        const ans = ClosestPoints.getClosest(a);
        expect(ans[0][0]).to.equal(bruteForce[0][0]);
        expect(ans[0][1]).to.equal(bruteForce[0][1]);
        expect(ans[1][0]).to.equal(bruteForce[1][0]);
        expect(ans[1][1]).to.equal(bruteForce[1][0]);
    });
});
