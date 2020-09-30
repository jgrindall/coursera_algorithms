import * as chai from 'chai';
import {Heap, HeapType} from "../Heap";
import {MedianMaintainer}  from "../MedianMaintainer";
import * as _ from "lodash";

let expect = chai.expect;

const _eq = (a:Array<number>, b:Array<number>):boolean=>{
    if(a.length !== b.length){
        return false;
    }
    for(let i = 0; i < a.length; i++){
        if(a[i] !== b[i]){
            return false;
        }
    }
    return true;
}

const checkHeap = (h:Heap):boolean=>{
    const vals = h.getVals();
    for(let i = 0; i < vals.length; i++){
        if(!h.checkHeapProperty(i)){
            return false;
        }
    }
    return true;
};

const getAllLists = (a:Array<number>, len:number):Array<Array<number>>=>{
    if(len === 0 || a.length === 0){
        return [];
    }
    else if(len === 1){
        return a.map(entry => [entry]);
    }
    const lists:Array<Array<number>> = [];
    a.forEach(entry0=>{
        getAllLists(_.without(a, entry0), len - 1).forEach(list=>{
            lists.push([entry0, ...list]);
        });
    });
    return lists;
}

describe("heaps", () => {

    const testSimple = (a:Array<number>)=>{
        let h:Heap = new Heap(a);
        expect(checkHeap(h)).to.equal(true);
        h = new Heap(a, HeapType.MAX);
        expect(checkHeap(h)).to.equal(true);
    };

    const testAll = (n:number)=>{
        getAllLists(_.range(n), n).forEach(testSimple);
    };

    const testAllMinMax = (n:number, type:HeapType = HeapType.MIN)=>{
        getAllLists(_.range(n), n).forEach((a:Array<number>)=>{
            testSimpleMinMax(a, type);
        });
    };

    const testSimpleMinMax = (a:Array<number>, type:HeapType = HeapType.MIN)=>{
        const clone:Array<number> = [...a];
        const sorted = clone.sort( (a:number, b:number) => {
            if(type === HeapType.MIN){
                return a - b;
            }
            return b - a;
        });
        const h:Heap = new Heap(a, type);
        const vals:Array<number> = [];
        let size:number = a.length;
        while(h.getVals().length >= 1){
            vals.push(h.remove());
            expect(checkHeap(h)).to.equal(true);
            expect(h.getVals().length).to.equal(size - 1);
            size--;
        }
        expect(checkHeap(h)).to.equal(true);
        expect(h.getVals().length).to.equal(0);
        expect(_eq(vals, sorted)).to.equal(true);
    };

    it("test simple", () =>{
        testSimple([1]);
        testSimple([1, 2]);
        testSimple([2, 1]);
        testSimple([1, 2, 3]);
        testSimple([1, 3, 2]);
        testSimple([2, 1, 3]);
        testSimple([2, 3, 1]);
        testSimple([3, 1, 2]);
        testSimple([3, 2, 1]);
    }).timeout(60000);

    it("test more", () => {
        testAll(5);
        testAll(7);
        //testAll(9);
    }).timeout(60000);

    it("gets minimum", ()=>{
        testSimpleMinMax([1]);
        testSimpleMinMax([1, 2]);
        testSimpleMinMax([2, 1]);
        testSimpleMinMax([1, 2, 3]);
        testSimpleMinMax([1, 3, 2]);
        testSimpleMinMax([2, 1, 3]);
        testSimpleMinMax([2, 3, 1]);
        testSimpleMinMax([3, 1, 2]);
        testSimpleMinMax([3, 2, 1]);
    });

    it("gets minimum more", () => {
        testAllMinMax(5);
        testAllMinMax(7);
        //testAllMinMax(9);
    }).timeout(60000);

    it("gets maximim", ()=>{
        testSimpleMinMax([1], HeapType.MAX);
        testSimpleMinMax([1, 2], HeapType.MAX);
        testSimpleMinMax([2, 1], HeapType.MAX);
        testSimpleMinMax([1, 2, 3], HeapType.MAX);
        testSimpleMinMax([1, 3, 2], HeapType.MAX);
        testSimpleMinMax([2, 1, 3], HeapType.MAX);
        testSimpleMinMax([2, 3, 1], HeapType.MAX);
        testSimpleMinMax([3, 1, 2], HeapType.MAX);
        testSimpleMinMax([3, 2, 1], HeapType.MAX);
    });

    it("gets maximum more", () => {
        testAllMinMax(5, HeapType.MAX);
        testAllMinMax(7, HeapType.MAX);
        //testAllMinMax(9, HeapType.MAX);
    }).timeout(60000);

    it("test large arrays", () => {
        const a:Array<number> = [];
        for(let i = 0; i < 100; i++){
            a.push(Math.sin(i));
        }
        testSimpleMinMax(a, HeapType.MIN);
        const b:Array<number> = [];
        for(let i = 0; i < 100; i++){
            b.push(Math.cos(i));
        }
        testSimpleMinMax(b, HeapType.MAX);

    }).timeout(60000);

});

const getMedian = (a:Array<number>):number => {
    const clone:Array<number> = [...a];
    const sorted = clone.sort( (a:number, b:number) => {
        return a - b;
    });
    if(a.length % 2 === 0){
        return sorted[a.length/2 - 1];
    }
    return sorted[(a.length - 1)/2];
}

describe("median", () => {

    const test = (a:Array<number>)=>{
        const median = getMedian(a);
        const m = new MedianMaintainer();
        a.forEach(val =>{
            m.add(val);
        });
        expect(median === m.getMedian()).to.equal(true);
    };

    const testAll = (n:number)=>{
        getAllLists(_.range(n), n).forEach(test);
    };

    it("simple", () => {
        test([10, 5, 7, 11, 8, 14]);
    }).timeout(60000);

    it("all", () => {
        testAll(3);
        testAll(5);
        testAll(7);
        //testAll(9);
    }).timeout(60000);

    it("test large arrays", () => {
        const a:Array<number> = [];
        for(let i = 0; i < 100; i++){
            a.push(Math.sin(i));
        }
        test(a);
        const b:Array<number> = [];
        for(let i = 0; i < 100; i++){
            b.push(Math.cos(i));
        }
        test(b);

    }).timeout(60000);


});
