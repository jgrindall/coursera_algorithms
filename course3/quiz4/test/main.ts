import * as chai from 'chai';
import {Knapsack} from "../Knapsack";
import {SeqAlignment} from "../SeqAlignment";
import {OptSearchTree} from "../OptSearchTree";

import * as _ from "lodash";

let expect = chai.expect;

const _eq = <T>(a:Array<T>, b:Array<T>):boolean=>{
    if(a.length !== b.length){
        return false;
    }
    for(let i = 0; i < a.length; i++){
        if(a[i] !== b[i]){
            return false;
        }
    }
    return true;
}

it("test basic cases", ()=>{
    let values = [5];
    let capacity:number = 5;
    let weights = [5];
    const k = new Knapsack(weights, values, capacity);
    const a = k.generateSolutions();
    //a[i][j] = best value for using first 'i' items and capacity j
    expect(a.get(0)[0].totalValue).to.equal(0);
    expect(a.get(0)[1].totalValue).to.equal(0);
    expect(a.get(0)[2].totalValue).to.equal(0);
    expect(a.get(0)[3].totalValue).to.equal(0);
    expect(a.get(0)[4].totalValue).to.equal(0);
    expect(a.get(0)[5].totalValue).to.equal(0);

    expect(a.get(1)[0].totalValue).to.equal(0);
    expect(a.get(1)[1].totalValue).to.equal(0);
    expect(a.get(1)[2].totalValue).to.equal(0);
    expect(a.get(1)[3].totalValue).to.equal(0);
    expect(a.get(1)[4].totalValue).to.equal(0);
    expect(a.get(1)[5].totalValue).to.equal(5);

    expect(_eq(a.get(1)[5].weights, [0])).to.equal(true);
});


it("test basic cases 2", ()=>{
    let values = [1, 1];
    let capacity:number = 4;
    let weights = [2, 2];
    const k = new Knapsack(weights, values, capacity);
    const a = k.generateSolutions();
    //a[i][j] = best value for using first 'i' items and capacity j
    expect(a.get(0)[0].totalValue).to.equal(0);
    expect(a.get(0)[1].totalValue).to.equal(0);
    expect(a.get(0)[2].totalValue).to.equal(0);
    expect(a.get(0)[3].totalValue).to.equal(0);
    expect(a.get(0)[4].totalValue).to.equal(0);

    expect(a.get(1)[0].totalValue).to.equal(0);
    expect(a.get(1)[1].totalValue).to.equal(0);
    expect(a.get(1)[2].totalValue).to.equal(1);
    expect(a.get(1)[3].totalValue).to.equal(1);
    expect(a.get(1)[4].totalValue).to.equal(1);

    expect(a.get(2)[0].totalValue).to.equal(0);
    expect(a.get(2)[1].totalValue).to.equal(0);
    expect(a.get(2)[2].totalValue).to.equal(1);
    expect(a.get(2)[3].totalValue).to.equal(1);
    expect(a.get(2)[4].totalValue).to.equal(2);

    expect(_eq(a.get(2)[4].weights, [0, 1])).to.equal(true);

});

it("test from the lecture", ()=>{
    let values = [3, 2, 4, 4];
    let capacity:number = 6;
    let weights = [4, 3, 2, 3];
    const k = new Knapsack(weights, values, capacity);
    const a = k.generateSolutions();
    //a[i][j] = best value for using first 'i' items and capacity j
    expect(a.get(0)[0].totalValue).to.equal(0);
    expect(a.get(0)[1].totalValue).to.equal(0);
    expect(a.get(0)[2].totalValue).to.equal(0);
    expect(a.get(0)[3].totalValue).to.equal(0);
    expect(a.get(0)[4].totalValue).to.equal(0);
    expect(a.get(0)[5].totalValue).to.equal(0);
    expect(a.get(0)[6].totalValue).to.equal(0);

    expect(a.get(1)[0].totalValue).to.equal(0);
    expect(a.get(1)[1].totalValue).to.equal(0);
    expect(a.get(1)[2].totalValue).to.equal(0);
    expect(a.get(1)[3].totalValue).to.equal(0);
    expect(a.get(1)[4].totalValue).to.equal(3);
    expect(a.get(1)[5].totalValue).to.equal(3);
    expect(a.get(1)[6].totalValue).to.equal(3);

    expect(a.get(2)[0].totalValue).to.equal(0);
    expect(a.get(2)[1].totalValue).to.equal(0);
    expect(a.get(2)[2].totalValue).to.equal(0);
    expect(a.get(2)[3].totalValue).to.equal(2);
    expect(a.get(2)[4].totalValue).to.equal(3);
    expect(a.get(2)[5].totalValue).to.equal(3);
    expect(a.get(2)[6].totalValue).to.equal(3);

    expect(a.get(3)[0].totalValue).to.equal(0);
    expect(a.get(3)[1].totalValue).to.equal(0);
    expect(a.get(3)[2].totalValue).to.equal(4);
    expect(a.get(3)[3].totalValue).to.equal(4);
    expect(a.get(3)[4].totalValue).to.equal(4);
    expect(a.get(3)[5].totalValue).to.equal(6);
    expect(a.get(3)[6].totalValue).to.equal(7);

    expect(a.get(4)[0].totalValue).to.equal(0);
    expect(a.get(4)[1].totalValue).to.equal(0);
    expect(a.get(4)[2].totalValue).to.equal(4);
    expect(a.get(4)[3].totalValue).to.equal(4);
    expect(a.get(4)[4].totalValue).to.equal(4);
    expect(a.get(4)[5].totalValue).to.equal(8);
    expect(a.get(4)[6].totalValue).to.equal(8);

    expect(_eq(a.get(4)[6].weights, [2, 3])).to.equal(true);

});

it("test from the lecture with maxColumns", ()=>{
    let values = [3, 2, 4, 4];
    let capacity:number = 6;
    let weights = [4, 3, 2, 3];
    const k = new Knapsack(weights, values, capacity, 3);
    const a = k.generateSolutions();
    //a[i][j] = best value for using first 'i' items and capacity j
    expect(a.get(0)).to.equal(undefined);
    expect(a.get(1)).to.equal(undefined);

    expect(a.get(2)[0].totalValue).to.equal(0);
    expect(a.get(2)[1].totalValue).to.equal(0);
    expect(a.get(2)[2].totalValue).to.equal(0);
    expect(a.get(2)[3].totalValue).to.equal(2);
    expect(a.get(2)[4].totalValue).to.equal(3);
    expect(a.get(2)[5].totalValue).to.equal(3);
    expect(a.get(2)[6].totalValue).to.equal(3);

    expect(a.get(3)[0].totalValue).to.equal(0);
    expect(a.get(3)[1].totalValue).to.equal(0);
    expect(a.get(3)[2].totalValue).to.equal(4);
    expect(a.get(3)[3].totalValue).to.equal(4);
    expect(a.get(3)[4].totalValue).to.equal(4);
    expect(a.get(3)[5].totalValue).to.equal(6);
    expect(a.get(3)[6].totalValue).to.equal(7);

    expect(a.get(4)[0].totalValue).to.equal(0);
    expect(a.get(4)[1].totalValue).to.equal(0);
    expect(a.get(4)[2].totalValue).to.equal(4);
    expect(a.get(4)[3].totalValue).to.equal(4);
    expect(a.get(4)[4].totalValue).to.equal(4);
    expect(a.get(4)[5].totalValue).to.equal(8);
    expect(a.get(4)[6].totalValue).to.equal(8);

    expect(_eq(a.get(4)[6].weights, [2, 3])).to.equal(true);

});

it("test optimal", ()=>{
    //https://people.sc.fsu.edu/~jburkardt/datasets/knapsack_01/knapsack_01.html
    let values = [24, 13, 23, 15, 16];
    let capacity:number = 26;
    let weights = [12, 7, 11, 8, 9];
    const k = new Knapsack(weights, values, capacity);
    const a = k.generateSolutions();
    //a[i][j] = best value for using first 'i' items and capacity j
    expect(_.last(a.get(5)).totalValue).to.equal(51);

    // using maxCols

    const k1 = new Knapsack(weights, values, capacity, 2);
    const a1 = k1.generateSolutions();
    //a[i][j] = best value for using first 'i' items and capacity j
    expect(a1.get(0)).to.equal(undefined);
    expect(a1.get(1)).to.equal(undefined);
    expect(a1.get(2)).to.equal(undefined);
    expect(a1.get(3)).to.equal(undefined);
    expect(_.last(a1.get(5)).totalValue).to.equal(51);

    const k2 = new Knapsack(weights, values, capacity, 3);
    const a2 = k2.generateSolutions();
    //a[i][j] = best value for using first 'i' items and capacity j
    expect(a2.get(0)).to.equal(undefined);
    expect(a2.get(1)).to.equal(undefined);
    expect(a2.get(2)).to.equal(undefined);
    expect(_.last(a2.get(5)).totalValue).to.equal(51);

});

it("test optimal2", ()=>{
    //https://people.sc.fsu.edu/~jburkardt/datasets/knapsack_01/knapsack_01.html
    let weights = [56, 59, 80, 64, 75, 17];
    let capacity:number = 190;
    let values = [50, 50, 64, 46, 50, 5];
    const k = new Knapsack(weights, values, capacity);
    const a = k.generateSolutions();
    expect(_.last(a.get(6)).totalValue).to.equal(150);

    // using maxCols

    const k1 = new Knapsack(weights, values, capacity, 2);
    const a1 = k1.generateSolutions();
    expect(a1.get(0)).to.equal(undefined);
    expect(a1.get(1)).to.equal(undefined);
    expect(a1.get(2)).to.equal(undefined);
    expect(a1.get(3)).to.equal(undefined);
    expect(a1.get(4)).to.equal(undefined);
    expect(_.last(a1.get(6)).totalValue).to.equal(150);

    const k2 = new Knapsack(weights, values, capacity, 3);
    const a2 = k2.generateSolutions();
    expect(a2.get(0)).to.equal(undefined);
    expect(a2.get(1)).to.equal(undefined);
    expect(a2.get(2)).to.equal(undefined);
    expect(a2.get(3)).to.equal(undefined);
    expect(_.last(a2.get(6)).totalValue).to.equal(150);
});


it("basic seq alingment", ()=>{
    let seq0 = 'a';
    let seq1 = 'a';
    const constMismatcher = (a:string, b:string)=>{
        if(a === b){
            return 0;
        }
        return 1;
    };
    const s = new SeqAlignment(seq0, seq1, 0.5, constMismatcher);
    const a = s.generateSolutions();
    expect(a[0][0]).to.equal(0);
    expect(a[0][1]).to.equal(0.5);
    expect(a[1][0]).to.equal(0.5);
    expect(a[1][1]).to.equal(0);
});

it("seq alingment", ()=>{
    let seq0 = 'at';
    let seq1 = 'a';
    const constMismatcher = (a:string, b:string)=>{
        if(a === b){
            return 0;
        }
        return 1;
    };
    const s = new SeqAlignment(seq0, seq1, 0.5, constMismatcher);
    const a = s.generateSolutions();
    expect(a[0][0]).to.equal(0);
    expect(a[0][1]).to.equal(0.5);
    expect(a[1][0]).to.equal(0.5);
    expect(a[1][1]).to.equal(0);
    expect(a[2][0]).to.equal(1);
    expect(a[2][1]).to.equal(0.5);
});

const BIO = {
    "AA":0,
    "AG":5,
    "AC":5,
    "AT":5,
    "GA":5,
    "GG":0,
    "GC":4,
    "GT":5,
    "CA":5,
    "CG":4,
    "CC":0,
    "CT":5,
    "TA":5,
    "TG":5,
    "TC":5,
    "TT":0
};

it("more seq alignment", ()=>{
    let seq0 = 'AGTGCTGAAAGTTGCGCCAGTGAC';
    let seq1 = 'AGTGCTGAAGTTCGCCAGTTGACG';
    const s = new SeqAlignment(seq0, seq1, 3, (a:string, b:string)=>{
        return BIO[a + b];
    });
    const a = s.generateSolutions();
    expect(a[seq0.length][seq1.length]).to.equal(12);
});

it("more seq alignment", ()=>{
    let seq0 = 'CACAATTTTTCCCAGAGAGA';
    let seq1 = 'CGAATTTTTCCCAGAGAGA';
    const s = new SeqAlignment(seq0, seq1, 3, (a:string, b:string)=>{
        return BIO[a + b];
    });
    const a = s.generateSolutions();
    expect(a[seq0.length][seq1.length]).to.equal(7);
});

it("bin search tree - sumProbabilities", ()=>{
    let probabilities = [4, 6, 4, 2, 1];
    const opt = new OptSearchTree(probabilities);
    expect(opt.sumProbabilities(1, 1)).to.equal(4);
    expect(opt.sumProbabilities(2, 2)).to.equal(6);
    expect(opt.sumProbabilities(3, 3)).to.equal(4);
    expect(opt.sumProbabilities(4, 4)).to.equal(2);
    expect(opt.sumProbabilities(5, 5)).to.equal(1);
    expect(opt.sumProbabilities(1, 2)).to.equal(10);
    expect(opt.sumProbabilities(1, 3)).to.equal(14);
    expect(opt.sumProbabilities(1, 4)).to.equal(16);
    expect(opt.sumProbabilities(1, 5)).to.equal(17);
    expect(opt.sumProbabilities(2, 4)).to.equal(12);
    expect(opt.sumProbabilities(3, 5)).to.equal(7);
    expect(opt.sumProbabilities(4, 5)).to.equal(3);
});


it("bin search tree", ()=>{
    let probabilities = [34, 8, 50];
    const opt = new OptSearchTree(probabilities);
    expect(opt.generate()).to.equal(142);
});
