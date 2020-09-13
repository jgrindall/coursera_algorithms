import * as chai from 'chai';
import {RSelect, Comparator, PivotCalc, LeftPivot, RightPivot, RandomPivot} from "../RSelect";
import * as _ from "lodash";

let expect = chai.expect;

const comp:Comparator<number> = (a:number, b:number):boolean => {
    return a <= b;
};

const getArray = (n:number)=>{
    return _.shuffle(_.range(n));
};

describe("description", () => {

    const findOrderStatWithPivot = (n:number, i:number, pivotCalc:PivotCalc<number>)=>{
        const a = getArray(n);
        const rs = new RSelect<number>(a, comp);
        rs.setPivotCalc(pivotCalc);
        expect(rs.getOrderStat(i, 0, n - 1)).to.equal(i);
    };

    it("works", () =>{
        for(let n = 4; n < 200; n++){
            for(let i = 0; i < n; i++){
                findOrderStatWithPivot(n, i, new LeftPivot<number>());
            }
        }
    });

    it("works using right pivot", () =>{
        for(let n = 4; n < 200; n++){
            for(let i = 0; i < n; i++){
                findOrderStatWithPivot(n, i, new RightPivot<number>());
            }
        }
    });

    it("works using random pivot", () =>{
        for(let n = 4; n < 200; n++){
            for(let i = 0; i < n; i++){
                findOrderStatWithPivot(n, i, new RandomPivot<number>());
            }
        }
    });

});
