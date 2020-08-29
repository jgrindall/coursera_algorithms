import * as chai from 'chai';
import {MergeSort, Comparator} from "../MergeSort";
let expect = chai.expect;

describe("description", () => {

    const comp:Comparator<number> = {
        isLessThan:(a:number, b:number):boolean => {
            return a < b;
        }
    };

    const check = a =>{
        const ans = MergeSort.sort(a, comp);
        expect(ans.length).to.equal(a.length);
        if(a.length >= 2){
            for(let i = 0; i < ans.length - 1; i++){
                expect(ans[i] <= ans[i + 1]).to.equal(true);
            }
        }
    };

    it("check empty", () =>{
        const ans = MergeSort.sort([], comp);
        expect(Array.isArray(ans)).to.equal(true);
        expect(ans.length).to.equal(0);
    });

    it("check basic", () =>{
        check([]);
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
        check([1, 1, 1, 5, 5, 5]);
        check([5, 5, 5, 1, 1, 1]);
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
