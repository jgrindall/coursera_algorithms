import * as chai from 'chai';
import {Hash, AdjList, prune} from "../AdjList";
import * as _ from "lodash";
import {getSubsetsOfSize, getSubsetsOfSizeThatContainA, getAllSubsetsThatContainA, TSP} from "../TSP";

let expect = chai.expect;

const factorials = [];
const factorial = (n:number)=>{
    if (n == 0 || n == 1){
        return 1;
    }
    if (factorials[n] > 0){
        return factorials[n];
    }
    factorials[n] = factorial(n - 1) * n;
    return factorials[n];
};

const choose = (n:number, r:number)=>{
    return factorial(n)/( factorial(n - r) * factorial(r) );
};

describe("getSubsetsOfSize", () => {

    const testCount = (a:number, b:number, m:number)=>{
        const results:number[][] = getSubsetsOfSize(a, b, m);
        expect(results.length).to.equal(choose(b - a + 1, m));
    };

    const testCount2 = (a:number, b:number, m:number)=>{
        const results:number[][] = getSubsetsOfSizeThatContainA(a, b, m);
        expect(results.length).to.equal(choose(b - a, m - 1));
    };

    const testCount3 = (a:number, b:number,)=>{
        const results:number[][] = getAllSubsetsThatContainA(a, b);
        let expected = 1; //size 1
        for(let size = 2; size <= b - a + 1; size++){
            expected += choose(b - a, size - 1);
        }
        expect(results.length).to.equal(expected);
    };

    it("getSubsetsOfSize", () =>{
        testCount(3, 7, 1);
        testCount(3, 7, 2);
        testCount(3, 7, 4);
        testCount(3, 7, 5);
    });

    it("getSubsetsOfSizeThatContainA", () =>{
        testCount2(3, 7, 1);
        testCount2(3, 7, 2);
        testCount2(3, 7, 4);
        testCount2(3, 7, 5);
    });

    it("getAllSubsetsThatContainA", () =>{
        testCount3(3, 7);
        testCount3(4, 7);
        testCount3(5, 7);
        testCount3(6, 7);
    });

});

const g0:Hash = {
    '1':[
        ['1', '2', 10],
        ['1', '3', 5]
    ],
    '2':[
        ['2', '1', 10],
        ['2', '3', 20]
    ],
    '3':[
        ['3', '1', 5],
        ['3', '2', 20]
    ]
};

// https://www.geeksforgeeks.org/travelling-salesman-problem-set-1/
const gWebsite:Hash = {
    '1':[
        ['1', '2', 10],
        ['1', '3', 15],
        ['1', '4', 20]
    ],
    '2':[
        ['2', '1', 10],
        ['2', '3', 35],
        ['2', '4', 25]
    ],
    '3':[
        ['3', '1', 15],
        ['3', '2', 35],
        ['3', '4', 30]
    ],
    '4':[
        ['4', '1', 20],
        ['4', '2', 25],
        ['4', '3', 30]
    ]
};

// https://jlmartin.ku.edu/courses/math105-F14/chapter6-part6.pdf
const gWebsite2:Hash = {
    '1':[
        ['1', '2', 12],
        ['1', '3', 10],
        ['1', '4', 19],
        ['1', '5', 8]
    ],
    '2':[
        ['2', '1', 12],
        ['2', '3', 3],
        ['2', '4', 7],
        ['2', '5', 2]
    ],
    '3':[
        ['3', '1', 10],
        ['3', '2', 3],
        ['3', '4', 6],
        ['3', '5', 20]
    ],
    '4':[
        ['4', '1', 19],
        ['4', '2', 7],
        ['4', '3', 6],
        ['4', '5', 4]
    ],
    '5':[
        ['5', '1', 8],
        ['5', '2', 2],
        ['5', '3', 20],
        ['5', '4', 4]
    ]
};

// https://jlmartin.ku.edu/courses/math105-F14/chapter6-part6.pdf
const gWebsite3:Hash = {
    '1':[
        ['1', '2', 12],
        ['1', '3', 29],
        ['1', '4', 22],
        ['1', '5', 13],
        ['1', '6', 24]
    ],
    '2':[
        ['2', '1', 12],
        ['2', '3', 19],
        ['2', '4', 3],
        ['2', '5', 25],
        ['2', '6', 6]
    ],
    '3':[
        ['3', '1', 29],
        ['3', '2', 19],
        ['3', '4', 21],
        ['3', '5', 23],
        ['3', '6', 28]
    ],
    '4':[
        ['4', '1', 22],
        ['4', '2', 3],
        ['4', '3', 21],
        ['4', '5', 4],
        ['4', '6', 5]
    ],
    '5':[
        ['5', '1', 13],
        ['5', '2', 25],
        ['5', '3', 23],
        ['5', '4', 4],
        ['5', '6', 16]
    ],
    '6':[
        ['6', '1', 24],
        ['6', '2', 6],
        ['6', '3', 28],
        ['6', '4', 5],
        ['6', '5', 16]
    ]
};

describe("tsp", () => {

    it("very simple", () =>{
        expect(new TSP(g0).solve()).to.equal(35);
    });

    it("simple", () =>{
        expect(new TSP(gWebsite).solve()).to.equal(80);
    });

    it("5 nodes", () =>{
        expect(new TSP(gWebsite2).solve()).to.equal(32);
    });

    it("6 nodes", () =>{
        expect(new TSP(gWebsite3).solve()).to.equal(76);
    });

});
