import * as chai from 'chai';
import {Hash, AdjList} from "../AdjList";
import * as _ from "lodash";
import {Scc} from "../Scc";
import {Progress, Components, Component, ExploredType} from "../Types";

let expect = chai.expect;

const _eq = (a:Array<string>, b:Array<string>):boolean=>{
    if(a.length !== b.length){
        return false;
    }
    return _.difference(a, b).length === 0 && _.difference(b, a).length === 0;
};

const dfs = (g:AdjList, node:string):Component=>{
    const progress:Progress = {};
    const nodes = g.getNodes();
    const reachable:Array<string> = [];
    nodes.forEach((node:string)=>{
        progress[node] = {
            explored: ExploredType.UNEXPLORED
        };
    });
    const visit = (node:string)=>{
        if(progress[node].explored === ExploredType.EXPLORED){
            return;
        }
        else{
            progress[node].explored = ExploredType.EXPLORED;
            const neighbours = g.getNeighbours(node);
            neighbours.forEach(visit);
        }
    };
    visit(node);
    nodes.forEach((node:string)=>{
        if(progress[node].explored === ExploredType.EXPLORED){
            reachable.push(node);
        }
    });
    return reachable;
};

const equivalent = (g:AdjList, a:string, b:string):boolean =>{
    if(a === b){
        return true;
    }
    const fromA = dfs(g, a), fromB = dfs(g, b);
    return fromA.includes(b) && fromB.includes(a);
};

const getAllEquiv = (g:AdjList, a:string):Array<string>=>{
    return g.getNodes().filter(node=>{
        return equivalent(g, a, node);
    });
};

const isScc  = (g:AdjList, comp:Component):boolean=>{
    const nodes = g.getNodes();
    for(let i = 0; i < nodes.length; i++){
        const node = nodes[i];
        // either i) node is in comp and is equiv to everything in comp and nothing else
        //or
        // ii) node is not in comp and is not equiv to anything in comp
        const allEquiv = getAllEquiv(g, node);
        if(comp.includes(node)){
            if(!_eq(allEquiv, comp)){
                return false;
            }
        }
        else{
            if(_.intersection(allEquiv, comp).length >= 1){
                return false;
            }
        }
    }
    return true;
};

const validateScc = (g:AdjList, comps:Components):boolean=>{
    const roots:Array<string> = Object.keys(comps);
    for(let i:number = 0; i < roots.length; i++){
        const key:string = roots[i];
        const comp:Component = comps[key];
        if(!comp.includes(key)){
            return false;
        }
        if(!isScc(g, comp)){
            return false;
        }
    }
    return true;
};

const getGraph = ():Hash=>{
    return {
        '0':[
            '1',
            '3'
        ],
        '1':[
            '2',
            '4'
        ],
        '2':[
            '3'
        ],
        '3':[
            '2'
        ],
        '4':[

        ]
    };
};

const getLectureGraph = ():Hash=>{
    // from the lecture
    return {
        '0':[
            '1',
            '3'
        ],
        '1':[
            '2'
        ],
        '2':[
            '0'
        ],
        '3':[
            '4',
            '6'
        ],
        '4':[
            '5'
        ],
        '5':[
            '3'
        ],
        '6':[
            '7'
        ],
        '7':[
            '8'
        ],
        '8':[
            '6'
        ]
    };
};

const getSmallGraph = ():Hash=>{
    return {
        '0': [ '1', '2' ],
        '1': [ '2' ],
        '2': []
    };
};



describe("description", () => {

    it("reverses", () =>{
        const hash = getGraph();
        const g = new AdjList(hash);
        const gRev = g.reverse();
        const hashRev = {
            '0':[

            ],
            '1':[
                '0'
            ],
            '2':[
                '1',
                '3'
            ],
            '3':[
                '0',
                '2'
            ],
            '4':[
                '1'
            ]
        };
        expect(JSON.stringify(hashRev) === JSON.stringify(gRev.getHash())).to.equal(true);
        const gRevRev = gRev.reverse();
        expect(JSON.stringify(hash) === JSON.stringify(gRevRev.getHash())).to.equal(true);
    });

    it("gets finishing times", () =>{
        const hash = getLectureGraph();
        const g = new AdjList(hash);
        const progress:Progress = new Scc(g).getFinishingTimes();
        expect(progress['0'].finishingTime).to.equal(2);
        expect(progress['1'].finishingTime).to.equal(0);
        expect(progress['2'].finishingTime).to.equal(1);
        expect(progress['3'].finishingTime).to.equal(5);
        expect(progress['4'].finishingTime).to.equal(3);
        expect(progress['5'].finishingTime).to.equal(4);
        expect(progress['6'].finishingTime).to.equal(6);
        expect(progress['7'].finishingTime).to.equal(7);
        expect(progress['8'].finishingTime).to.equal(8);
    });

    it("gets sources", () =>{
        const hash = getLectureGraph();
        const g = new AdjList(hash);
        const progress:Progress = new Scc(g).getSourceVertices();
        expect(progress['0'].source).to.equal('0');
        expect(progress['1'].source).to.equal('0');
        expect(progress['2'].source).to.equal('0');
        expect(progress['3'].source).to.equal('3');
        expect(progress['4'].source).to.equal('3');
        expect(progress['5'].source).to.equal('3');
        expect(progress['6'].source).to.equal('8');
        expect(progress['7'].source).to.equal('8');
        expect(progress['8'].source).to.equal('8');
    });

    it("gets scc - small", () =>{
        const g = new AdjList(getSmallGraph());
        const progress:Progress = new Scc(g).getFinishingTimes();
        const comps:Components = new Scc(g).getScc();
        expect(validateScc(g, comps)).to.equal(true);
    });

    it("gets scc - simple", () =>{
        const g = new AdjList({
            '0':[

            ]
        });
        const comp:Components = new Scc(g).getScc();
        expect(Object.keys(comp).length).to.equal(1);
        expect(Object.keys(comp)[0]).to.equal('0');
        expect(comp['0'].length).to.equal(1);
        expect(comp['0'][0]).to.equal('0');
    });

    it("gets scc - simple (n)", () =>{
        const hash = {};
        const N = 50;
        for(let i = 0; i < N; i++){
            hash["" + i] = [];
        }
        const g = new AdjList(hash);
        const comp:Components = new Scc(g).getScc();
        expect(Object.keys(comp).length).to.equal(N);
        for(let i = 0; i < N; i++){
            expect(Object.keys(comp)[i]).to.equal(i + '');
            expect(comp[i + ''].length).to.equal(1);
            expect(comp[i + ''][0]).to.equal(i + '');
        }
    });

    it("gets scc - complete", () =>{
        const hash = {};
        const N = 50;
        for(let i = 0; i < N; i++){
            hash["" + i] = [];
            for(let j = 0; j < N; j++){
                if(i !== j){
                    hash["" + i].push(j + "");
                }
            }
        }
        const g = new AdjList(hash);
        const comp:Components = new Scc(g).getScc();
        expect(Object.keys(comp).length).to.equal(1);
        const key = Object.keys(comp)[0];
        expect(comp[key].length).to.equal(N);
        for(let i = 0; i < N; i++){
            expect(comp[key].includes(i + '')).to.equal(true);
        }
    });

    it("gets scc - 3 components from the lecture", () =>{
        const hash = getLectureGraph();
        const g = new AdjList(hash);
        const comps:Components = new Scc(g).getScc();
        expect(validateScc(g, comps)).to.equal(true);
    });

    const checkRandom = (n:number, density:number = 0.5)=>{
        const hash = {};
        for(let i = 0; i < n; i++){
            hash["" + i] = [];
            for(let j = 0; j < n; j++){
                if(i !== j && Math.random() < density){
                    hash["" + i].push(j + "");
                }
            }
        }
        const g = new AdjList(hash);
        const comps:Components = new Scc(g).getScc();
        expect(!!comps).to.equal(true);
        expect(validateScc(g, comps)).to.equal(true);
    };

    it("gets scc - large", () =>{
        checkRandom(500);
    }).timeout(10000);

    it("gets scc - large sparse", () =>{
        checkRandom(500, 0.1);
    }).timeout(10000);

    it("gets scc - large dense", () =>{
        checkRandom(500, 0.9);
    }).timeout(10000);

    it("gets scc - random", () =>{
        const n = 50;
        for(let _t:number = 0; _t < 50; _t++){
            checkRandom(n);
        }
    }).timeout(10000);

    it("gets scc - sparse", () =>{
        const n = 50;
        for(let _t:number = 0; _t < 50; _t++){
            checkRandom(n, 0.1);
        }
    }).timeout(10000);

    it("gets scc - dense", () =>{
        const n = 20;
        for(let _t:number = 0; _t < 50; _t++){
            checkRandom(n, 0.9);
        }
    }).timeout(10000);

    it("gets scc - random", () =>{
        const n = 50;
        for(let _t:number = 0; _t < 50; _t++){
            checkRandom(n, Math.random());
        }
    }).timeout(10000);

});
