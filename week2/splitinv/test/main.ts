import * as chai from 'chai';
import {InversionCounter, Comparator} from "../InversionCounter";
let expect = chai.expect;

const bruteForce = (a:Array<number>)=>{
    let n = 0;
    for(let i = 0; i < a.length - 1; i++){
        for(let j = i + 1; j < a.length; j++){
            if(a[i] > a[j]){
                n++;
            }
        }
    }
    return n;
};

describe("description", () => {

    const comp:Comparator<number> = {
        isLessThanOrEq:(a:number, b:number):boolean => {
            return a <= b;
        }
    };

    const check = (a:Array<number>) => {
        const ans = InversionCounter.sortAndCount(a, comp);
        expect(ans.a.length).to.equal(a.length);
        if(a.length >= 2){
            for(let i = 0; i < ans.a.length - 1; i++){
                expect(ans.a[i] <= ans.a[i + 1]).to.equal(true);
            }
        }
        expect(ans.n).to.equal(bruteForce(a));
    };

    it("check empty", () =>{
        const ans = InversionCounter.sortAndCount([], comp);
        expect(Array.isArray(ans.a)).to.equal(true);
        expect(ans.a.length).to.equal(0);
        expect(ans.n).to.equal(0);
    });

    it("check basic", () =>{
        check([1]);
        check([1, 1]);
        check([0, 1]);
        check([1, 0]);
        check([1, 1, 1]);
        check([1, 0, 0]);
        check([0, 1, 0]);
        check([0, 0, 1]);
        check([1, 1, 0]);
        check([0, 1, 1]);
        check([1, 0, 1]);
    });

    it("check", () =>{
        check([1, 2, 3, 4, 5, 6]);
        check([6, 5, 4, 3, 2, 1]);
        check([1, 4, 5, 2, 6, 3]);
        check([2, 4, 5, 3, 4, 1]);
    });

    it("check large arrays", () =>{
        const a = [];
        for(let i = 0; i < 200; i++){
            a.push(Math.floor(Math.random() * 10));
        }
        check(a);
        const b = [];
        for(let i = 0; i < 200; i++){
            b.push(Math.floor(Math.random() * 1000));
        }
        check(b);
    });
    
});
