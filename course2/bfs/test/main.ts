import * as chai from 'chai';
import {Hash, AdjList} from "../AdjList";
import * as _ from "lodash";
import {Bfs, Component} from "../Bfs";

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
            '3'
        ],
        '2':[

        ],
        '3':[
            '2',
            '0',
            '5'
        ],
        '4':[
            '1',
            '5',
            '3'
        ],
        '5':[
            '4',
            '3'
        ]
    };
};

describe("description", () => {

    it("finds dist for simple graph a-a", () =>{
        const hash:Hash = {
            '0':[]
        };
        const g:AdjList = new AdjList(hash);
        const dist = new Bfs(g).getDist('0', '0');
        expect(dist).to.equal(0);
    });

    it("finds dist for graph 1", () =>{
        const hash:Hash = getGraph();
        const g:AdjList = new AdjList(hash);
        const dist = new Bfs(g).getDist('0', '1');
        expect(dist).to.equal(1);
    });

    it("finds dist for graph 2", () =>{
        const hash:Hash = getGraph();
        const g:AdjList = new AdjList(hash);
        const dist = new Bfs(g).getDist('0', '5');
        expect(dist).to.equal(2);
    });

    it("finds dist for graph 3", () =>{
        const hash:Hash = getGraph();
        const g:AdjList = new AdjList(hash);
        const dist = new Bfs(g).getDist('3', '4');
        expect(dist).to.equal(2);
    });

    it("finds dist for graph 4", () =>{
        const hash:Hash = getGraph();
        const g:AdjList = new AdjList(hash);
        const dist = new Bfs(g).getDist('2', '5');
        expect(dist).to.equal(Infinity);
    });

    it("finds dist components", () =>{
        // from the lecture
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
        const comps:Array<Component> = new Bfs(g).getConnectedComponents();
        expect(comps.length).to.equal(3);
        expect(_eq(comps[0], ['1', '3', '5', '7', '9'])).to.equal(true);
        expect(_eq(comps[1], ['2', '4'])).to.equal(true);
        expect(_eq(comps[2], ['6', '8', '10'])).to.equal(true);
    });

});
