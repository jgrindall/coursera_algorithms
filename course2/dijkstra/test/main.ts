import * as chai from 'chai';
import {Hash, AdjList, WeightedEdge} from "../AdjList";
import * as _ from "lodash";
import {Dijkstra} from "../Dijkstra";
import {Paths, PathItem} from "../Types";

let expect = chai.expect;

const _eq = (a:Array<string>, b:Array<string>):boolean=>{
    if(a.length !== b.length){
        return false;
    }
    return _.difference(a, b).length === 0 && _.difference(b, a).length === 0;
};

const getSmallGraph = ():Hash=>{
    return {
        '0':[
            ['1', 1],
            ['2', 4]
        ],
        '1':[
            ['2', 2],
            ['3', 6]
        ],
        '2':[
            ['3', 3]
        ],
        '3':[]
    };
};

// get a random graph where 0 definitely has a route to all other nodes
const getRandomGraph = (n:number, len0:number, len:number, density:number = 0.5)=>{
    const hash = {};
    let i:number, j:number;
    for(i = 0; i < n; i++){
        hash["" + i] = [];
    }
    for(j = 1; j < n; j++){
        const edge:WeightedEdge = [j + "", Math.ceil(Math.random()*len0)];
        hash["" + 0].push(edge);
    }
    // now 0 has a route to all nodes (of length len0);
    const g = new AdjList(hash);

    for(let i = 1; i < n; i++){
        for(j = 1; j < n; j++){
            if(i !== j && !g.hasEdge(i + '', j + '') && Math.random() < density){
                const edge:WeightedEdge = [j + '', Math.ceil(Math.random()*len)];
                hash[i + ''].push(edge);
            }
        }
    }
    return g;
};

const getAllLists = (a:Array<string>, len:number):Array<Array<string>>=>{
    if(len === 0 || a.length === 0){
        return [];
    }
    else if(len === 1){
        return a.map(entry => [entry]);
    }
    const lists:Array<Array<string>> = [];
    a.forEach(entry0=>{
        getAllLists(_.without(a, entry0), len - 1).forEach(list=>{
            lists.push([entry0, ...list]);
        });
    });
    return lists;
}

const getShortestBruteForce = (g:AdjList, node0:string, node1:string):number=>{
    if(node0 === node1){
        return 0;
    }
    const nodes = g.getNodes();
    let minWeight:number = Infinity;
    const intermediateNodes:Array<string> = _.without(nodes, node0, node1);
    // check all paths of length 2...n between the two nodes
    for(let pathLen:number = 2; pathLen <= nodes.length; pathLen++){
        let possiblePaths:Array<Array<string>>;
        if(pathLen === 2){
            possiblePaths = [[]];
        }
        else{
            possiblePaths = getAllLists(intermediateNodes, pathLen - 2);
        }
        possiblePaths = possiblePaths.map((path:Array<string>)=>{
            return [node0, ...path, node1];
        });
        // these are all possible paths from node0 to node1
        possiblePaths.forEach((path:Array<string>)=>{
            let weight:number = 0;
            // does it exist and if so, what is its weight?
            for(let i = 0; i < path.length - 1; i++){
                const node1 = path[i], node2 = path[i + 1];
                if(g.hasEdge(node1, node2)){
                    weight += g.getWeight(node1, node2);
                }
                else{
                    weight = Infinity;
                }
            }
            if(weight < minWeight){
                minWeight = weight;
            }
        });
    }
    return minWeight;
};

describe("description", () => {

    it("simple test", () =>{
        const g = new AdjList(getSmallGraph());
        const paths:Paths = new Dijkstra(g).getShortestPaths('0');
        expect(_eq(Object.keys(paths), ['0', '1', '2', '3'])).to.equal(true);
        expect(paths['0'].length).to.equal(0);
        expect(_eq(paths['0'].route, ['0'])).to.equal(true);
        expect(paths['1'].length).to.equal(1);
        expect(_eq(paths['1'].route, ['0', '1'])).to.equal(true);
        expect(paths['2'].length).to.equal(3);
        expect(_eq(paths['2'].route, ['0', '1', '2'])).to.equal(true);
        expect(paths['3'].length).to.equal(6);
        expect(_eq(paths['3'].route, ['0', '1', '2', '3'])).to.equal(true);
    }).timeout(10000);

    it("test all lists", () =>{
        let lists:Array<Array<string>> = getAllLists([], 3);
        expect(lists.length).to.equal(0);

        lists = getAllLists(['0', '1'], 0);
        expect(lists.length).to.equal(0);

        lists = getAllLists(['0', '1'], 1);
        expect(lists.length).to.equal(2);

        lists = getAllLists(['0', '1', '2'], 2);
        expect(lists.length).to.equal(3*2);

        lists = getAllLists(['0', '1', '2', '3', '4'], 3);
        expect(lists.length).to.equal(5*4*3);

        lists = getAllLists(['0', '1', '2', '3', '4', '5', '6', '7'], 5);
        expect(lists.length).to.equal(8*7*6*5*4);

    }).timeout(10000);

    const check = (g:AdjList, node0:string)=>{
        const paths:Paths = new Dijkstra(g).getShortestPaths(node0);
        const nodes = g.getNodes();
        for(let i = 0; i < nodes.length; i++){
            const node = nodes[i];
            const shortestDijkstra:number = paths[node].length;
            const shortestBruteForce:number = getShortestBruteForce(g, node0, node);
            expect(shortestDijkstra).to.equal(shortestBruteForce);
        }
    };

    it("test small graph", () =>{
        const hash:Hash = {
            "0": [
                [
                  "1",
                  3
                ],
                [
                  "2",
                  5
                ],
                [
                  "3",
                  5
                ]
              ],
              "1": [
                [
                  "2",
                  1
                ],
                [
                  "3",
                  1
                ]
              ],
              "2": [],
              "3": []
        };
        const g:AdjList = new AdjList(hash);
        check(g, '0');
    }).timeout(10000);

    it("test random small graph", () =>{
        const g:AdjList = getRandomGraph(6, 20, 5);
        check(g, '0');
    }).timeout(10000);

    it("test random large graph", () =>{
        const g:AdjList = getRandomGraph(11, 40, 5);
        check(g, '0');
    }).timeout(60000);

    it("test random small graphs", () =>{
        const numTests:number = 200, numNodes:number = 7;
        for(let _t:number = 0; _t < numTests; _t++){
            const g:AdjList = getRandomGraph(numNodes,  Math.ceil(Math.random()*20), Math.ceil(Math.random()*10), Math.random());
            check(g, '0');
        }
    }).timeout(60000);

    it("test random large graphs", () =>{
        const numTests:number = 10, numNodes:number = 10;
        for(let _t:number = 0; _t < numTests; _t++){
            const g:AdjList = getRandomGraph(numNodes,  Math.ceil(Math.random()*20), Math.ceil(Math.random()*10), Math.random());
            check(g, '0');
        }
    }).timeout(60000);


});
