import * as chai from 'chai';
import {Heap} from "../Heap";
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
        const val:number = vals[i];
        const children = h.getChildren(i);
        const incorrectChildren = children.filter((child:number)=>(child < val));
        if(incorrectChildren.length >= 1){
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

describe("description", () => {

    const testSimple = (a:Array<number>)=>{
        const h:Heap = new Heap(a);
        expect(checkHeap(h)).to.equal(true);
    };

    const testAll = (n:number)=>{
        getAllLists(_.range(n), n).forEach(testSimple);
    };

    const testAllMin = (n:number)=>{
        getAllLists(_.range(n), n).forEach(testSimpleMin);
    };

    const testSimpleMin = (a:Array<number>)=>{
        const clone:Array<number> = [...a];
        const h:Heap = new Heap(a);
        const mins:Array<number> = [];
        let size:number = a.length;
        while(h.getVals().length >= 1){
            const min = h.removeMin();
            mins.push(min);
            expect(checkHeap(h)).to.equal(true);
            expect(h.getVals().length).to.equal(size - 1);
            size--;
        }
        expect(checkHeap(h)).to.equal(true);
        expect(h.getVals().length).to.equal(0);
        expect(_eq(mins, clone.sort( (a, b) => a - b))).to.equal(true);
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
        testAll(9);
    }).timeout(60000);

    it("gets minimum", ()=>{
        testSimpleMin([1]);
        testSimpleMin([1, 2]);
        testSimpleMin([2, 1]);
        testSimpleMin([1, 2, 3]);
        testSimpleMin([1, 3, 2]);
        testSimpleMin([2, 1, 3]);
        testSimpleMin([2, 3, 1]);
        testSimpleMin([3, 1, 2]);
        testSimpleMin([3, 2, 1]);
    });

    it("gets minimum more", () => {
        testAllMin(5);
        testAllMin(7);
        testAllMin(9);
    }).timeout(60000);

});
