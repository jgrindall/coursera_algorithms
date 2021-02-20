import * as chai from 'chai';
import {Hash, AdjList, prune} from "../AdjList";
import * as _ from "lodash";
import {BellmanFord, SSRecord, recordEquals, pathEquals} from "../BellmanFord";
import {FloydWarshall, SSPath} from "../FloydWarshall";

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
        const p3 = {
            vertices:[],
            length:Infinity
        };
        const p4 = {
            vertices:["2"],
            length:0
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

        const p4 = {
            vertices:["2", "1"],
            length:1
        };
        const p5 = {
            vertices:["2"],
            length:0
        };
        const p6 = {
            vertices:["2", "3"],
            length:3
        };
        const p7 = {
            vertices:["3", "2", "1"],
            length:11
        };
        const p8 = {
            vertices:["3", "2"],
            length:10
        };
        const p9 = {
            vertices:["3"],
            length:0
        };
        const bf:SSRecord = new BellmanFord(g1).getSSSP("1");
        expect(pathEquals(bf.get("1"), p1)).to.equal(true);
        expect(pathEquals(bf.get("2"), p2)).to.equal(true);
        expect(pathEquals(bf.get("3"), p3)).to.equal(true);

        const fw:Map<string, SSPath> = new FloydWarshall(g1).getAPSP();
        expect(pathEquals(fw.get("1-1"), p1)).to.equal(true);
        expect(pathEquals(fw.get("1-2"), p2)).to.equal(true);
        expect(pathEquals(fw.get("1-3"), p3)).to.equal(true);

        expect(pathEquals(fw.get("2-1"), p4)).to.equal(true);
        expect(pathEquals(fw.get("2-2"), p5)).to.equal(true);
        expect(pathEquals(fw.get("2-3"), p6)).to.equal(true);

        expect(pathEquals(fw.get("3-1"), p7)).to.equal(true);
        expect(pathEquals(fw.get("3-2"), p8)).to.equal(true);
        expect(pathEquals(fw.get("3-3"), p9)).to.equal(true);
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

    it("very simple test, all pairs", () =>{
        const hash = {
            '1':[]
        };
        const bf:Map<string, SSRecord> = BellmanFord.getAPSP(hash);
        const node1:SSRecord = bf.get("1");
        expect(pathEquals(node1.get("1"), {vertices:["1"], length:0})).to.equal(true);

        const fw:Map<string, SSPath> = new FloydWarshall(hash).getAPSP();
        expect(pathEquals(fw.get("1-1"), {vertices:["1"], length:0})).to.equal(true);
    });

    it("simple test, all pairs", () =>{
        const bf:Map<string, SSRecord> = BellmanFord.getAPSP(g0);
        const p1 = {
            vertices:["1"],
            length:0
        };
        const p2 = {
            vertices:["1", "2"],
            length:5
        };
        const p3 = {
            vertices:["2"],
            length:0
        };
        const p4 = {
            vertices:[],
            length:Infinity
        };
        expect(pathEquals(bf.get("1").get("1"), p1)).to.equal(true);
        expect(pathEquals(bf.get("1").get("2"), p2)).to.equal(true);
        expect(pathEquals(bf.get("2").get("1"), p4)).to.equal(true);
        expect(pathEquals(bf.get("2").get("2"), p3)).to.equal(true);

        const fw:Map<string, SSPath> = new FloydWarshall(g0).getAPSP();
        expect(pathEquals(fw.get("1-1"), p1)).to.equal(true);
        expect(pathEquals(fw.get("1-2"), p2)).to.equal(true);
        expect(pathEquals(fw.get("2-1"), p4)).to.equal(true);
        expect(pathEquals(fw.get("2-2"), p3)).to.equal(true);
    });

    it("simple test, all pairs", () =>{
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
        const p4 = {
            vertices:["2", "1"],
            length:1
        };
        const p5 = {
            vertices:["2"],
            length:0
        };
        const p6 = {
            vertices:["2", "3"],
            length:3
        };
        const p7 = {
            vertices:["3", "2", "1"],
            length:11
        };
        const p8 = {
            vertices:["3", "2"],
            length:10
        };
        const p9 = {
            vertices:["3"],
            length:0
        };

        const bf:Map<string, SSRecord> = BellmanFord.getAPSP(g1);
        expect(pathEquals(bf.get("1").get("1"), p1)).to.equal(true);
        expect(pathEquals(bf.get("1").get("2"), p2)).to.equal(true);
        expect(pathEquals(bf.get("1").get("3"), p3)).to.equal(true);
        expect(pathEquals(bf.get("2").get("1"), p4)).to.equal(true);
        expect(pathEquals(bf.get("2").get("2"), p5)).to.equal(true);
        expect(pathEquals(bf.get("2").get("3"), p6)).to.equal(true);
        expect(pathEquals(bf.get("3").get("1"), p7)).to.equal(true);
        expect(pathEquals(bf.get("3").get("2"), p8)).to.equal(true);
        expect(pathEquals(bf.get("3").get("3"), p9)).to.equal(true);

        const fw:Map<string, SSPath> = new FloydWarshall(g1).getAPSP();
        expect(pathEquals(fw.get("1-1"), p1)).to.equal(true);
        expect(pathEquals(fw.get("1-2"), p2)).to.equal(true);
        expect(pathEquals(fw.get("1-3"), p3)).to.equal(true);
        expect(pathEquals(fw.get("2-1"), p4)).to.equal(true);
        expect(pathEquals(fw.get("2-2"), p5)).to.equal(true);
        expect(pathEquals(fw.get("2-3"), p6)).to.equal(true);
        expect(pathEquals(fw.get("3-1"), p7)).to.equal(true);
        expect(pathEquals(fw.get("3-2"), p8)).to.equal(true);
        expect(pathEquals(fw.get("3-3"), p9)).to.equal(true);
    });

    it("simple test from lecture, all pairs", () =>{
        const bf:Map<string, SSRecord> = BellmanFord.getAPSP(gLecture);
        const p_ss = {
            vertices:["s"],
            length:0
        };
        const p_sv = {
            vertices:["s", "v"],
            length:2
        };
        const p_sx = {
            vertices:["s", "v", "x"],
            length:3
        };
        const p_sw = {
            vertices:["s", "v", "w"],
            length:4
        };
        const p_st = {
            vertices:["s", "v", "w", "t"],
            length:6
        };

        const p_vt = {
            vertices:["v", "w", "t"],
            length:4
        };
        const p_xw = {
            vertices:[],
            length:Infinity
        };
        const p_ws = {
            vertices:[],
            length:Infinity
        };
        const p_tt = {
            vertices:["t"],
            length:0
        };


        expect(pathEquals(bf.get("s").get("s"), p_ss)).to.equal(true);
        expect(pathEquals(bf.get("s").get("v"), p_sv)).to.equal(true);
        expect(pathEquals(bf.get("s").get("x"), p_sx)).to.equal(true);
        expect(pathEquals(bf.get("s").get("w"), p_sw)).to.equal(true);
        expect(pathEquals(bf.get("s").get("t"), p_st)).to.equal(true);

        expect(pathEquals(bf.get("v").get("t"), p_vt)).to.equal(true);
        expect(pathEquals(bf.get("x").get("w"), p_xw)).to.equal(true);
        expect(pathEquals(bf.get("w").get("s"), p_ws)).to.equal(true);
        expect(pathEquals(bf.get("t").get("t"), p_tt)).to.equal(true);

        const fw:Map<string, SSPath> = new FloydWarshall(gLecture).getAPSP();
        expect(pathEquals(fw.get("s-s"), p_ss)).to.equal(true);
        expect(pathEquals(fw.get("s-v"), p_sv)).to.equal(true);
        expect(pathEquals(fw.get("s-x"), p_sx)).to.equal(true);
        expect(pathEquals(fw.get("s-w"), p_sw)).to.equal(true);
        expect(pathEquals(fw.get("s-t"), p_st)).to.equal(true);
        expect(pathEquals(fw.get("v-t"), p_vt)).to.equal(true);
        expect(pathEquals(fw.get("x-w"), p_xw)).to.equal(true);
        expect(pathEquals(fw.get("w-s"), p_ws)).to.equal(true);
        expect(pathEquals(fw.get("t-t"), p_tt)).to.equal(true);

    });

    it("simple test from geeksforgeeks, all pairs", () =>{
        const bf:Map<string, SSRecord> = BellmanFord.getAPSP(gWebsite);
        expect(bf.get("A").get("A").length).to.equal(0);
        expect(bf.get("A").get("B").length).to.equal(-1);
        expect(bf.get("A").get("C").length).to.equal(2);
        expect(bf.get("A").get("D").length).to.equal(-2);
        expect(bf.get("A").get("E").length).to.equal(1);

        expect(bf.get("B").get("C").length).to.equal(3);
        expect(bf.get("C").get("D").length).to.equal(Infinity);
        expect(bf.get("D").get("C").length).to.equal(4);
        expect(bf.get("E").get("B").length).to.equal(-2);


        const fw:Map<string, SSPath> = new FloydWarshall(gWebsite).getAPSP();
        expect((fw.get("A-A").length)).to.equal(0);
        expect((fw.get("A-B").length)).to.equal(-1);
        expect((fw.get("A-C").length)).to.equal(2);
        expect((fw.get("A-D").length)).to.equal(-2);
        expect((fw.get("A-E").length)).to.equal(1);
        expect((fw.get("B-C").length)).to.equal(3);
        expect((fw.get("C-D").length)).to.equal(Infinity);
        expect((fw.get("D-C").length)).to.equal(4);
        expect((fw.get("E-B").length)).to.equal(-2);

    });

});
