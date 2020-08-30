import * as chai from 'chai';
import {QuickSort} from "../QuickSort";
let expect = chai.expect;

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
}

const allGreaterThan = (a:Array<number>, val:number):boolean=>{
    return a.filter(x => x > val).length === a.length;
}

describe("description", () => {

    const checkPartition = (a:Array<number>)=>{
        console.log('a', a);
        let numLessThanFirst = 0;
        for(let i = 1; i < a.length; i++){
            if(a[i] < a[0]){
                numLessThanFirst ++;
            }
        }
        const p = QuickSort.partition(a, 0, a.length - 1);
        console.log('a par', a);
        console.log('p', p);
        console.log('numLessThanFirst', numLessThanFirst);
        expect(p).to.equal(numLessThanFirst);
        console.log('a0', a.slice(0, p));
        console.log('a1', a.slice(p + 1));
        expect(allLessThan(a.slice(0, p), a[p])).to.equal(true);
        expect(allGreaterThan(a.slice(p + 1), a[p])).to.equal(true);
    };

    it("partitions", () =>{
        //checkPartition([9, 8, 2, 5, 1, 4, 7, 6]);
        //checkPartition([3, 8, 2, 10, 1, 4, 7, 6]);
        //checkPartition([8, 5, 2, 5, 1, 4, 9, 6]);
        checkPartition([4, 8, 2, 6, 1, 9, 7, 11]);
    });

});
