import * as chai from 'chai';
import {Hash, AdjList} from "../AdjList";
import {MinCut, Cut} from "../MinCut";
import * as _ from "lodash";

let expect = chai.expect;

const _eq = (a:Array<string>, b:Array<string>):boolean=>{
    if(a.length !== b.length){
        return false;
    }
    return _.difference(a, b).length === 0 && _.difference(b, a).length === 0;
};

const getGraph = ():Hash=>{
    return {
        '0':[
            '1',
            '2',
            '3'
        ],
        '1':[
            '2',
            '4',
            '3',
            '0'
        ],
        '2':[
            '5',
            '3',
            '0',
            '1'
        ],
        '3':[
            '1',
            '2',
            '0',
            '5'
        ],
        '4':[
            '1'
        ],
        '5':[
            '3',
            '2'
        ]
    };
};

describe("description", () => {

    it("contract works for a simple graph", () =>{
        const hash:Hash = getGraph();
        const g:AdjList = new AdjList();
        g.setHash(hash);
        const c1 = g.contract('2', '3');
        const c2 = c1.contract('2,3', '1');
        const c3 = c2.contract('2,3,1', '5');
        const c4 = c3.contract('2,3,1,5', '4');
        const hash4 = c4.getHash();
        const ans4 = {
            '0': [
                '2,3,1,5,4'
            ],
            '2,3,1,5,4': [
                '0'
            ]
        };
        expect(JSON.stringify(ans4)).to.equal(JSON.stringify(hash4));
    });

    const check = ()=>{
        const hash:Hash = getGraph();
        const g:AdjList = new AdjList(hash);
        const c:Cut = new MinCut(g).getCut();
        const nodesA = c.a, nodesB = c.b;
        expect(nodesA.length + nodesB.length).to.equal(6);
        expect(_eq(_.union(nodesA, nodesB), ['0', '1', '2', '3', '4', '5'])).to.equal(true);
    };

    it("gets a cut, for a simple graph", () =>{
        for(let i = 0; i < 20; i++){
            check();
        }
    });

    it("gets min cut", ()=>{
        // https://en.wikipedia.org/wiki/Karger%27s_algorithm#/media/File:10_repetitions_of_Karger%E2%80%99s_contraction_procedure.svg
        const hash = {
            '0':['5', '1', '2', '3', '4'],
            '1':['6', '2', '3', '4', '0'],
            '2':['7', '3', '4', '0', '1'],
            '3':['4', '0', '1', '2'],
            '4':['0', '1', '2', '3'],
            '5':['9', '8', '7', '6', '0'],
            '6':['5', '9', '8', '7', '1'],
            '7':['6', '5', '9', '8', '2'],
            '8':['9', '7', '6', '5'],
            '9':['5', '8', '7', '6']
        };
        const g:AdjList = new AdjList(hash);
        const c:Cut = new MinCut(g).getMinCut();
        expect(c.count).to.equal(3);
        const a = ['0', '1', '2', '3', '4'], b = ['5', '6', '7', '8', '9'];
        const aabb = _eq(c.a, a) && _eq(c.b, b);
        const abab = _eq(c.a, b) && _eq(c.b, a);
        expect(aabb || abab).to.equal(true);
    });

});
