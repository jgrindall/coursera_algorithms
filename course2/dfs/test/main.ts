import * as chai from 'chai';
import {Hash, AdjList} from "../AdjList";
import * as _ from "lodash";
import {Dfs, Component} from "../Dfs";

let expect = chai.expect;

const _eq = (a:Array<string>, b:Array<string>):boolean=>{
    if(a.length !== b.length){
        return false;
    }
    return _.difference(a, b).length === 0 && _.difference(b, a).length === 0;
};

describe("description", () => {

    it("finds dist components", () =>{
        const hash:Hash = {
            '1':[
                '3',
                '5'
            ],
            '2':[
                '4'
            ],
            '3':[
                '1',
                '5'
            ],
            '4':[
                '2'
            ],
            '5':[
                '1',
                '3',
                '7',
                '9'
            ],
            '6':[
                '8',
                '10'
            ],
            '7':[
                '5'
            ],
            '8':[
                '6',
                '10'
            ],
            '9':[
                '5'
            ],
            '10':[
                '6',
                '8'
            ]
        }
        const g:AdjList = new AdjList(hash);
        const comps:Array<Component> = new Dfs(g).getConnectedComponents();
        expect(comps.length).to.equal(3);
        expect(_eq(comps[0], ['1', '3', '5', '7', '9'])).to.equal(true);
        expect(_eq(comps[1], ['2', '4'])).to.equal(true);
        expect(_eq(comps[2], ['6', '8', '10'])).to.equal(true);
    });

});
