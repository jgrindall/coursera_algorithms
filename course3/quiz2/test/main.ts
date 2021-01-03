import * as chai from 'chai';
import {Hash, AdjList} from "../AdjList";
import * as _ from "lodash";
import {Kruskal, getTotalWeight} from "../Kruskal";
import {UnionFind} from "../UnionFind";
import {Clustering, Cluster} from "../Clustering";

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

interface Point{
    x:number,
    y:number
}

const sortClusterArray = (a:Array<Cluster>):Array<Cluster> =>{
    const aSorted:Array<Cluster> = a.map(c=>[...c].sort());
    aSorted.sort( (c1:Cluster, c2:Cluster)=>{
        return c1[0] < c2[0] ? -1 : (c1[0] > c2[0] ? 1 : 0);
    });
    return aSorted;
};

const clustersEqual = (a:Array<Cluster>, b:Array<Cluster>):boolean =>{
    if(a.length !== b.length){
        return false;
    }
    return JSON.stringify(sortClusterArray(a)) === JSON.stringify(sortClusterArray(b));
}

const DELTA = 0.001;

const getPoint = (i:number, j:number):Point=>{
    return {
        x:i + 0.5 + (Math.random() - 0.5)*DELTA,
        y:j + 0.5 + (Math.random() - 0.5)*DELTA
    };
};
const dist = (p:Point, q:Point) => Math.sqrt((p.x - q.x)*(p.x - q.x) + (p.y - q.y)*(p.y - q.y));

const getClusteredGraph = (n:number, numPerCluster:number):AdjList=>{
    const pts:Array<Point> = [];
    for(let i:number = 0; i <= n - 1; i++){
        for(let j:number = 0; j <= n - 1; j++){
            for(let k:number = 1; k <= numPerCluster; k++){
                pts.push(getPoint(i, j));
            }
        }
    }
    const g:Hash = {};
    for(let i:number = 0; i < pts.length; i++){
        g["" + i] = [];
    }
    for(let i:number = 0; i < pts.length; i++){
        for(let j:number = 0; j < pts.length; j++){
            if(i !== j){
                g["" + i].push(["" + i, "" + j, dist(pts[i], pts[j])]);
            }
        }
    }
    return new AdjList(g);
};

const testCluster = (n:number)=>{
    const numPerCluster:number = 10;
    const graph:AdjList = getClusteredGraph(n, numPerCluster);
    const clustering:Clustering = new Clustering(graph);
    const clusters:Array<Cluster> = clustering.getClusters(n*n);
    const expectedClusters:Array<Cluster> = [];
    for(let i:number = 0; i < n*n; i++){
        expectedClusters.push(_.range(i*numPerCluster, (i + 1)*numPerCluster).map(n=> "" + n));
    }
    const spacing = clustering.getSpacing();
    expect(spacing <= 1 + DELTA && spacing >= 1 - DELTA).to.equal(true);
    expect(clustersEqual(clusters, expectedClusters)).to.equal(true);
};

it("test clustering", ()=>{
    testCluster(2);
    testCluster(3);
    testCluster(4);
    testCluster(5);
    testCluster(6);
});
