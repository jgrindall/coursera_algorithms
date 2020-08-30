import * as chai from 'chai';
import {QuickSort} from "../QuickSort";
let expect = chai.expect;

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

    const checkPartition = (a:Array<number>)=>{
        let numLessThanFirst = 0;
        for(let i = 1; i < a.length; i++){
            if(a[i] < a[0]){
                numLessThanFirst ++;
            }
        }
        const p = QuickSort.partition(a, 0, a.length - 1);
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
            QuickSort.sort(a, 0, a.length - 1);
            expect(len).to.equal(a.length);
            expect(isSorted(a)).to.equal(true);
        }
    });

});
