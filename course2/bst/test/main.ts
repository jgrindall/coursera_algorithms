import * as chai from 'chai';
import {Bst, Node} from "../Bst";
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

    const checkIsBst = (b:Bst, n?:Node)=>{
        if(!n){
            n = b.getRoot();
        }
        if(!n){
            return true;
        }
        expect(b.checkPropertyAtNode(n)).to.equal(true);
        if(n.getLeft()){
            checkIsBst(b, n.getLeft());
        }
        if(n.getRight()){
            checkIsBst(b, n.getRight());
        }
    };

    const testSimple = (a:Array<number>)=>{
        const min = _.min(a), max = _.max(a);
        const sorted = [...a].sort( (p, q) => p - q);
        const b:Bst = new Bst(a);
        checkIsBst(b);
        expect(b.getMin().getVal()).to.equal(min);
        expect(b.getMax().getVal()).to.equal(max);
        expect(_eq(sorted, b.getList())).to.equal(true);
        for(let i:number = 0; i < sorted.length; i++){
            const p = b.getPredecessorOf(sorted[i]);
            if(i === 0){
                expect(p).to.equal(undefined);
            }
            else{
                expect(p.getVal()).to.equal(sorted[i - 1]);
            }
        }
    };

    it("test 1", () => {
        testSimple([5, 3, 1, 4, 2]);
    }).timeout(60000);

    it("test 2", () => {
        testSimple([1, 2, 3, 4, 5]);
    }).timeout(60000);

    const testRandomN = (n:number)=>{
        getAllLists(_.range(n), n).forEach(testSimple);
    };

    it("test all", () => {
        testRandomN(4)
        testRandomN(6)
        testRandomN(8)
    }).timeout(60000);

    it("test random", () => {
        let a = _.range(100).map(Math.sin);
        testSimple(a);
        let b = _.range(200).map(Math.cos);
        testSimple(b);
    }).timeout(60000);

    const testDelete = (a:Array<number>, random?:Array<number>)=>{
        random = random || _.shuffle(a);
        const b:Bst = new Bst(a);
        checkIsBst(b);
        for(let i:number = 0; i < a.length; i++){
            b.remove(random[i]);
            checkIsBst(b);
        }
    };

    it("test remove simple", ()=>{
        testDelete([0, 16, 18, 2], [16, 18, 0, 2]);
        testDelete([1, 2, 3, 4, 5], [2, 5, 1, 3, 4]);
        testDelete([5, 3, 1, 4, 2]);
    });

    it("test remove", ()=>{
        for(let i = 0; i < 20; i++){
            let a = _.range(20).map(i=>Math.floor(Math.sin(i) * 20));
            a = _.uniq(a);
            testDelete(a);
        }
    });

});
