import * as chai from 'chai';
import {Hash, AdjList} from "../AdjList";
import * as _ from "lodash";
import {Kruskal, getTotalWeight, UnionFind} from "../Kruskal";

let expect = chai.expect;

const g1:Hash = {
    '1': [
        ['1', '2', 1],
        ['1', '3', 3],
        ['1', '4', 4]
    ],
    '2': [
        ['2', '1', 1],
        ['2', '3', 2]
    ],
    '3': [
        ['3', '2', 2],
        ['3', '1', 3],
        ['3', '4', 5]
    ],
    '4': [
        ['4', '1', 4],
        ['4', '3', 5]
    ]
};

// https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/
const g2:Hash = {
    '0': [
        ['0', '1', 4],
        ['0', '7', 8]
    ],
    '1': [
        ['1', '0', 4],
        ['1', '2', 8],
        ['1', '7', 11]
    ],
    '2': [
        ['2', '1', 8],
        ['2', '3', 7],
        ['2', '8', 2]
    ],
    '3': [
        ['3', '2', 7],
        ['3', '4', 9],
        ['3', '5', 14]
    ],
    '4': [
        ['4', '3', 9],
        ['4', '5', 10]
    ],
    '5': [
        ['5', '2', 4],
        ['5', '3', 14],
        ['5', '4', 10],
        ['5', '6', 2],
    ],
    '6': [
        ['6', '5', 2],
        ['6', '7', 1],
        ['6', '8', 6]
    ],
    '7': [
        ['7', '0', 8],
        ['7', '1', 11],
        ['7', '6', 1],
        ['7', '8', 7]
    ],
    '8': [
        ['8', '2', 2],
        ['8', '6', 6],
        ['8', '7', 7],
    ]
};

// https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/
const g3:Hash = {

    '0': [
        ['0', '1', 2],
        ['0', '3', 6]
    ],
    '1': [
        ['1', '0', 2],
        ['1', '2', 3],
        ['1', '3', 8],
        ['1', '4', 5]
    ],
    '2': [
        ['2', '1', 3],
        ['2', '4', 7]
    ],
    '3': [
        ['3', '0', 6],
        ['3', '1', 8],
        ['3', '4', 9]
    ],
    '4': [
        ['4', '1', 5],
        ['4', '2', 7],
        ['4', '3', 9]
    ]

};

describe("UnionFind simple", () => {
    const uf = new UnionFind(["a", "b", "c", "d", "e", "f"]);
    uf.union("a", "b");
    uf.union("b", "c");
    uf.union("b", "f");
    uf.union("f", "d");
    uf.union("b", "e");
    expect(uf.getComponent('a').length).to.equal(6);
    expect(uf.getComponent('b').length).to.equal(0);
    expect(uf.getComponent('c').length).to.equal(0);
    expect(uf.getComponent('d').length).to.equal(0);
    expect(uf.getComponent('e').length).to.equal(0);
    expect(uf.getComponent('f').length).to.equal(0);
    expect(uf.getLeader('a')).to.equal('a');
    expect(uf.getLeader('b')).to.equal('a');
    expect(uf.getLeader('c')).to.equal('a');
    expect(uf.getLeader('d')).to.equal('a');
    expect(uf.getLeader('e')).to.equal('a');
    expect(uf.getLeader('f')).to.equal('a');
});

it("simple test from lecture", () =>{
    const g = new AdjList(g1);
    const mst:AdjList = new Kruskal(g).getMST();
    const mstHash:Hash = mst.getHash();
    expect(getTotalWeight(mstHash)).to.equal(7);
}).timeout(10000);

it("larger test", () =>{
    const g = new AdjList(g2);
    const mst:AdjList = new Kruskal(g).getMST();
    const mstHash:Hash = mst.getHash();
    expect(getTotalWeight(mstHash)).to.equal(37);
});

it("larger test", () =>{
    const g = new AdjList(g3);
    const mst:AdjList = new Kruskal(g).getMST();
    const mstHash:Hash = mst.getHash();
    expect(getTotalWeight(mstHash)).to.equal(16);
});
