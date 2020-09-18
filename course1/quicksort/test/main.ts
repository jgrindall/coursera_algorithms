import * as chai from 'chai';
import {QuickSort, Comparator, median, LeftPivot, RightPivot, NumericMedianPivot, RandomPivot} from "../QuickSort";
let expect = chai.expect;

const comp:Comparator<number> = (a:number, b:number):boolean => {
    return a <= b;
};

const swap = (a:Array<number>, i:number, j:number):void=>{
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
};

const selectionIsSorted = (a:Array<number>, l:number, r:number)=>{
    for(let i = l; i <= r - 1; i++){
        if(a[i] > a[i + 1]){
            return false;
        }
    }
    return true;
};

const isSorted = (a:Array<number>)=>{
    return selectionIsSorted(a, 0, a.length - 1);
};

const allLessThan = (a:Array<number>, val:number):boolean=>{
    return a.filter(x => x < val).length === a.length;
};

const allGreaterThan = (a:Array<number>, val:number):boolean=>{
    return a.filter(x => x > val).length === a.length;
};

const getArray = (n:number)=>{
    const a = [];
    for(let i = 0; i < n; i++){
        a.push(i);
    }
    for(let i = 0; i < 2*n; i++){
        let i0 = Math.floor(Math.random()*n);
        let j0 = Math.floor(Math.random()*n);
        if(i0 !== j0){
            swap(a, i0, j0);
        }
    }
    return a;
};

describe("description", () => {

    it("check median", () =>{
        expect(median(0,5,7)).to.equal(5);
        expect(median(0,0,7)).to.equal(0);
        expect(median(0,2,2)).to.equal(2);
        expect(median(8,7,6)).to.equal(7);
        expect(median(7,6,8)).to.equal(7);
        expect(median(4,4,4)).to.equal(4);
        expect(median(6,4,6)).to.equal(6);
        expect(median(7,9,7)).to.equal(7);
        expect(median(1,1,-1)).to.equal(1);
        expect(median(0,10,6)).to.equal(6);
        expect(median(7,-2,7)).to.equal(7);
    });

    const checkPartition = (a:Array<number>)=>{
        let numLessThanFirst = 0;
        for(let i = 1; i < a.length; i++){
            if(a[i] < a[0]){
                numLessThanFirst ++;
            }
        }
        const qs = new QuickSort<number>(a, comp);
        const p = qs.partition(0, a.length - 1);
        expect(p).to.equal(numLessThanFirst);
        expect(allLessThan(a.slice(0, p), a[p])).to.equal(true);
        expect(allGreaterThan(a.slice(p + 1), a[p])).to.equal(true);
    };

    it("partitions", () =>{
        for(let n = 4; n < 20; n++){
            checkPartition(getArray(n));
        }
    });

    it("sorts", () =>{
        for(let n = 4; n < 200; n++){
            const a = getArray(n);
            const len = a.length;
            const qs = new QuickSort<number>(a, comp);
            qs.sort(0, a.length - 1);
            expect(len).to.equal(a.length);
            expect(isSorted(a)).to.equal(true);
        }
    });

    it("sorts using left pivot", () =>{
        for(let n = 4; n < 200; n++){
            const a = getArray(n);
            const len = a.length;
            const qs = new QuickSort<number>(a, comp);
            qs.setPivotCalc(new LeftPivot<number>());
            qs.sort(0, a.length - 1);
            expect(len).to.equal(a.length);
            expect(isSorted(a)).to.equal(true);
        }
    });

    it("sorts using right pivot", () =>{
        for(let n = 4; n < 5; n++){
            const a = getArray(n);
            const len = a.length;
            const qs = new QuickSort<number>(a, comp);
            qs.setPivotCalc(new RightPivot<number>());
            qs.sort(0, a.length - 1);
            expect(len).to.equal(a.length);
            expect(isSorted(a)).to.equal(true);
        }
    });

    it("sorts using random pivot", () =>{
        for(let n = 4; n < 200; n++){
            const a = getArray(n);
            const len = a.length;
            const qs = new QuickSort<number>(a, comp);
            qs.setPivotCalc(new RandomPivot<number>());
            qs.sort(0, a.length - 1);
            expect(len).to.equal(a.length);
            expect(isSorted(a)).to.equal(true);
        }
    });

    it("sorts using median of three pivot", () =>{
        for(let n = 4; n < 200; n++){
            const a = getArray(n);
            const len = a.length;
            const qs = new QuickSort<number>(a, comp);
            qs.setPivotCalc(new NumericMedianPivot());
            qs.sort(0, a.length - 1);
            expect(len).to.equal(a.length);
            expect(isSorted(a)).to.equal(true);
        }
    });

});
