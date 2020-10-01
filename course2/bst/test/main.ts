import * as chai from 'chai';
import {Bst} from "../Bst";
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

describe("bst", () => {

    const testSimple = (a:Array<number>)=>{
        const min = _.min(a), max = _.max(a);
        const sorted = [...a].sort( (p, q) => p - q);
        const b:Bst = new Bst(a);
        expect(b.checkPropertyAtRoot()).to.equal(true);
        expect(b.getMin()).to.equal(min);
        expect(b.getMax()).to.equal(max);
        expect(_eq(sorted, b.getList())).to.equal(true);
    };

    it("test", () => {
        testSimple([5, 3, 1, 4, 2]);
    }).timeout(60000);

    const testRandomN = (n:number)=>{
        getAllLists(_.range(n), n).forEach(testSimple);
    };

    it("test all", () => {
        testRandomN(5)
        testRandomN(7)
        testRandomN(9)
    }).timeout(60000);

    it("test random", () => {
        let a = _.range(100).map(Math.sin);
        testSimple(a);
        let b = _.range(200).map(Math.cos);
        testSimple(b);
    }).timeout(60000);




});
