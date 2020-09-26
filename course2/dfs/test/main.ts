import * as chai from 'chai';
import {Hash, AdjList} from "../AdjList";
import * as _ from "lodash";
import {Dfs} from "../Dfs";
import {Component, Progress, ExploredType} from "../Types";
import lecture from "./lecture";

let expect = chai.expect, assert = chai.assert;

const _eq = (a:Array<string | number>, b:Array<string | number>):boolean=>{
    if(a.length !== b.length){
        return false;
    }
    return _.difference(a, b).length === 0 && _.difference(b, a).length === 0;
};

// make a graph whose connected components are given in 'components'
const makeComponents = (components:Array<Array<string>>):AdjList=>{
    const g:AdjList = new AdjList({});
    components.forEach( (nodes:Array<string>) => {
        const n:number = nodes.length;
        nodes.forEach( (node:string) => {
            g.addNode(node);
        });
        let i:number;
        for(i = 0; i < n; i++){
            g.addEdge(nodes[i], nodes[(i + 1) % n]);
            g.addEdge(nodes[(i + 1) % n], nodes[i]);
        }
        // add some random edges
        for(i = 0; i < n*(n - 1)/2; i++){
            const p = _.sample(nodes);
            const q = _.sample(nodes);
            if(p !== q && !g.hasEdge(p, q)){
                g.addEdge(p, q);
                g.addEdge(q, p);
            }
        }
    });
    return g;
};

const makeGraphWithCycle = (nodes:Array<string>)=>{
    const g:AdjList = new AdjList({});
    const n:number = nodes.length;
    nodes.forEach( (node:string) => {
        g.addNode(node);
    });
    let i:number;
    for(i = 0; i < n; i++){
        g.addEdge(nodes[i], nodes[(i + 1) % n]);
    }
    for(i = 0; i < n*(n - 1)/2; i++){
        const p = _.sample(nodes);
        const q = _.sample(nodes);
        if(p !== q && !g.hasEdge(p, q)){
            g.addEdge(p, q);
        }
    }
    return g;
};

const makeAcyclicGraph = (nodes:Array<string>)=>{
    const g:AdjList = new AdjList({});
    const n:number = nodes.length;
    nodes.forEach( (node:string) => {
        g.addNode(node);
    });
    const numPerLayer = Math.floor(Math.sqrt(n));
    const getLayer = (node:string)=>{
        return Math.floor(nodes.indexOf(node) / numPerLayer);
    };
    for(let i = 0; i < n*n; i++){
        const p = _.sample(nodes);
        const q = _.sample(nodes);
        const layerP = getLayer(p);
        const layerQ = getLayer(q);
        if(p !== q && !g.hasEdge(p, q) && layerP < layerQ){
            g.addEdge(p, q);
        }
    }
    return g;
};

const checkDistComponents = ()=>{
    const compData = [];
    let count:number = 1;
    const numRows:number = 3 + Math.floor(Math.random()*10);  // eg. 3 rows
    for(let j = 1; j <= numRows; j++){
        const row = [];
        const rowLength = 3 + Math.floor(Math.random()*10);
        for(let k = 1; k <= rowLength; k++){
            row.push(count + "");
            count++;
        }
        compData.push(row);
    }
    const g:AdjList = makeComponents(compData);
    const comps:Array<Component> = new Dfs(g).getConnectedComponentsUndir();
    expect(comps.length).to.equal(compData.length);
    for(let i = 0; i < compData.length; i++){
        expect(_eq(comps[i], compData[i])).to.equal(true);
    }
};

const checkCyclic = ()=>{
    const n:number = 3 + Math.floor(Math.random()*10);
    const nodes = _.range(n).map(i => i + "");
    const g:AdjList = makeGraphWithCycle(nodes);
    const throws = ()=>{
        new Dfs(g).getTopologicalOrder();
    };
    assert.throws(throws, Error, "Found a cycle");
};

const checkAcyclic = ()=>{
    const n:number = 3 + Math.floor(Math.random()*10);
    const expectedExplored = _.range(n).map(i => ExploredType.EXPLORED); // all should be explored
    const expectedLabels =  _.range(1, n + 1); // 1,2,3...n
    const nodes = _.range(n).map(i => i + "");
    const g:AdjList = makeAcyclicGraph(nodes);
    const progress = new Dfs(g).getTopologicalOrder();
    expect(_eq(Object.values(progress).map(e => e.label), expectedLabels)).to.equal(true);
    expect(_eq(Object.values(progress).map(e => e.explored), expectedExplored)).to.equal(true);
    g.getAllEdges().forEach(e=>{
        expect(progress[e[0]].label < progress[e[1]].label).to.equal(true);
    });
};

describe("description", () => {

    it("finds dist components", () =>{
        const g:AdjList = new AdjList(lecture);
        const comps:Array<Component> = new Dfs(g).getConnectedComponentsUndir();
        expect(comps.length).to.equal(3);
        expect(_eq(comps[0], ['1', '3', '5', '7', '9'])).to.equal(true);
        expect(_eq(comps[1], ['2', '4'])).to.equal(true);
        expect(_eq(comps[2], ['6', '8', '10'])).to.equal(true);
    });

    it("finds dist components", () =>{
        for(let k = 1; k < 100; k++){
            checkDistComponents();
        }
    });

    it("detects cyclicity", () =>{
        for(let k = 1; k < 100; k++){
            checkCyclic();
        }
    });

    it("detects acyclicity", () =>{
        for(let k = 1; k <= 100; k++){
            checkAcyclic();
        }
    });

});
