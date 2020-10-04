import * as chai from 'chai';
import * as _ from "lodash";
import {SumCount} from "../SumCount";

let expect = chai.expect, assert = chai.assert;

describe("description", () => {

    const check = (a:Array<number>, r:number)=>{
        const sc:SumCount = new SumCount(a, r);
        const result = sc.start();
        let i:number, j:number;
        const possibleSums = {};
        for(i = 0; i < a.length; i++){
            for(j = 0; j < a.length; j++){
                if(a[i] !== a[j]){
                    possibleSums[a[i] + a[j]] = true;
                }
            }
        }
        for(i = -r; i <= r; i++){
            const found:boolean = !!(result[i + ''] && _.isArray(result[i + '']));
            const isPossible:boolean = !!possibleSums[i + ''];
            expect(found).to.equal(isPossible);
        }
    };

    it("finds simple", () =>{
        check([0, 1, 2, 3, 4], 2);
    });

    it("finds large", () =>{
        let a:Array<number> = [];
        for(let i = 0; i < 100; i++){
            a.push(Math.round(Math.sin(i) * 100));
        }
        a = _.shuffle(_.uniq(a));
        check(a, 10);
    });

});
