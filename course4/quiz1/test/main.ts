import * as chai from 'chai';
import {Hash, AdjList, prune} from "../AdjList";
import * as _ from "lodash";
import {BellmanFord, SSRecord, recordEquals, pathEquals} from "../BellmanFord";

let expect = chai.expect;

const g0:Hash = {
    '1': [
        ['1', '2', 5]
    ],
    '2':[]
};

const g1:Hash = {
    '1': [
        ['1', '2', 7],
        ['1', '2', 3]
    ],
    '2': [
        ['2', '1', 1],
        ['2', '3', 7],
        ['2', '3', 3]
    ],
    '3': [
        ['3', '2', 10]
    ]
};

const g1Pruned = {
    '1': [
        ['1', '2', 3]
    ],
    '2': [
        ['2', '1', 1],
        ['2', '3', 3]
    ],
    '3': [
        ['3', '2', 10]
    ]
};

const gLecture:Hash = {
    's': [
        ['s', 'v', 2],
        ['s', 'x', 4]
    ],
    'v': [
        ['v', 'x', 1],
        ['v', 'w', 2]
    ],
    'x': [
        ['x', 't', 4]
    ],
    'w': [
        ['w', 't', 2]
    ],
    't': [

    ]
};

const gWebsite:Hash = {
    'A': [
        ['A', 'B', -1],
        ['A', 'C', 4]
    ],
    'B': [
        ['B', 'C', 3],
        ['B', 'D', 2],
        ['B', 'E', 2]
    ],
    'C': [

    ],
    'D': [
        ['D', 'B', 1],
        ['D', 'C', 5]
    ],
    'E': [
        ['E', 'D', -3],
    ]
};

describe("Prune", () => {

    it("simple prune", () =>{
        const pruned = prune(g1);
        expect(JSON.stringify(pruned)).to.equal(JSON.stringify(g1Pruned));
    });

});

describe("BellmanFord simple", () => {

    it("very simple test", () =>{
        const hash = {
            '1':[]
        };
        const bf:SSRecord = new BellmanFord(hash).getSSSP("1");
        expect(pathEquals(bf.get("1"), {vertices:["1"], length:0})).to.equal(true);
    });



    it("simple test", () =>{
        const bf:SSRecord = new BellmanFord(g0).getSSSP("1");
        const p1 = {
            vertices:["1"],
            length:0
        };
        const p2 = {
            vertices:["1", "2"],
            length:5
        };
        expect(pathEquals(bf.get("1"), p1)).to.equal(true);
        expect(pathEquals(bf.get("2"), p2)).to.equal(true);
    });

    it("simple test", () =>{
        const p1 = {
            vertices:["1"],
            length:0
        };
        const p2 = {
            vertices:["1", "2"],
            length:3
        };
        const p3 = {
            vertices:["1", "2", "3"],
            length:6
        };
        const bf:SSRecord = new BellmanFord(g1).getSSSP("1");
        expect(pathEquals(bf.get("1"), p1)).to.equal(true);
        expect(pathEquals(bf.get("2"), p2)).to.equal(true);
        expect(pathEquals(bf.get("3"), p3)).to.equal(true);
    });

    it("simple test from lecture", () =>{
        const bf:SSRecord = new BellmanFord(gLecture).getSSSP("s");
        const p_s = {
            vertices:["s"],
            length:0
        };
        const p_v = {
            vertices:["s", "v"],
            length:2
        };
        const p_x = {
            vertices:["s", "v", "x"],
            length:3
        };
        const p_w = {
            vertices:["s", "v", "w"],
            length:4
        };
        const p_t = {
            vertices:["s", "v", "w", "t"],
            length:6
        };
        expect(pathEquals(bf.get("s"), p_s)).to.equal(true);
        expect(pathEquals(bf.get("v"), p_v)).to.equal(true);
        expect(pathEquals(bf.get("x"), p_x)).to.equal(true);
        expect(pathEquals(bf.get("w"), p_w)).to.equal(true);
        expect(pathEquals(bf.get("t"), p_t)).to.equal(true);
    });


    //https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/
    it("simple test from geeksforgeeks", () =>{
        const bf:SSRecord = new BellmanFord(gWebsite).getSSSP("A");
        expect(bf.get("A").length).to.equal(0);
        expect(bf.get("B").length).to.equal(-1);
        expect(bf.get("C").length).to.equal(2);
        expect(bf.get("D").length).to.equal(-2);
        expect(bf.get("E").length).to.equal(1);

    });

});
