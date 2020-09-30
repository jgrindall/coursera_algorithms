import * as chai from 'chai';
import {Heap} from "../Heap";
import * as _ from "lodash";

let expect = chai.expect;

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

});
