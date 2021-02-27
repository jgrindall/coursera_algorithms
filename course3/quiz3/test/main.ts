import * as chai from 'chai';
import {Huffman, getMinPair} from "../Huffman";
import {stringToTree, Node, getDepth} from "../Node";
import {MaxWeight} from "../MaxWeight";
import * as _ from "lodash";

let expect = chai.expect;

const testTree = (alphabet, weights, correctAnswers)=>{
    const tree:string = new Huffman(alphabet, weights).generate();
    const node:Node<string> = stringToTree(tree);
    let totalWeight:number = 0;
    let correctAnswerWeight:number = 0;
    alphabet.forEach((a:string, i:number)=>{
        const d = getDepth(node, a);
        totalWeight += d*weights[i];
        correctAnswerWeight += correctAnswers[i].length * weights[i];
    });
    expect(totalWeight).to.equal(correctAnswerWeight);
};

const toBin = (n:number, len:number):Array<boolean>=>{
    let remainders:Array<number> = [];
    while(n >= 1){
        remainders.push(n%2);
        n = Math.floor(n/2);
    }
    while(remainders.length < len){
        remainders.push(0);
    }
    return remainders.reverse().map(i => (i === 1));
};

const isIndependent = (bin:Array<boolean>)=>{
    if(bin.length <= 1){
        return true;
    }
    if(bin.length === 2){
        return !(bin[0] && bin[1]);
    }
    for(let i = 0; i <= bin.length - 2; i++){
        if(bin[i] && bin[i + 1]){
            return false;
        }
    }
    return true;
};

const getMaxWeightBruteForce = (weights:number[]):number=>{
    const len = weights.length;
    const bin = _.range(Math.pow(2, len)).map(i=>{
        return toBin(i, len);
    });
    let maxWeight:number = -Infinity;
    for(let i = 0; i < bin.length; i++){
        if(isIndependent(bin[i])){
            const w = _.reduce(bin[i], (memo, val, j)=>{
                return val ? (memo + weights[j]) : memo;
            }, 0);
            if(w > maxWeight){
                maxWeight = w;
            }
        }
    }
    return maxWeight;
};

it("test getMinPair", ()=>{
    let a = [5, 7, 3, 1, 4, 1, 5, 6];
    expect(getMinPair(a)[0]).to.equal(3);
    expect(getMinPair(a)[1]).to.equal(5);
});

it("test stringToTree", ()=>{
    let tests:string[] = [
        "a(b)(c)",
        "a",
        "a(b)()",
        "a()(c)",
        "a()(c(d)(e))",
        "a(c(d)(e))(c(d)(e))",
        "a(c(d)(a(b)(c)))(c(a(b)(a(b)(c)))(e))",
    ];
    tests.forEach(t=>{
        expect(stringToTree(t).toString()).to.equal(t);
    });
});

it("test tree 1", ()=>{
    let alphabet = ["a", "b", "c", "d"];
    const correctAnswers:string[] = ["0", "10", "110", "111"];
    let weights = [60, 25, 10, 5];
    testTree(alphabet, weights, correctAnswers);
    const tree:string = new Huffman(alphabet, weights).generate();
    expect(tree).to.equal('-(a)(-(b)(-(c)(d)))');
});

it("test tree 2", ()=>{
    let alphabet = ["a", "b", "c", "d", "e", "f"];
    const correctAnswers:string[] = ["000", "0010", "10", "01", "0011", "11"];
    let weights = [3, 2, 6, 8, 2, 6];
    testTree(alphabet, weights, correctAnswers);
    const tree:string = new Huffman(alphabet, weights).generate();
    expect(tree).to.equal('-(-(-(a)(-(b)(e)))(d))(-(c)(f))');
});

it("test max weight - simple", ()=>{
    let weights = [1, 4, 5, 4];
    expect(new MaxWeight(weights).getBestPath().weight).to.equal(8);
});

it("test max weight", ()=>{
    let weights = [1, 4, 5, 4, 3, 7, 2];
    expect(new MaxWeight(weights).getBestPath().weight).to.equal(getMaxWeightBruteForce(weights));
});
