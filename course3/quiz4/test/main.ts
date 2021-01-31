import * as chai from 'chai';
import {Knapsack} from "../Knapsack";

import * as _ from "lodash";

let expect = chai.expect;


it("test basic cases", ()=>{
    let values = [5];
    let capacity:number = 5;
    let weights = [5];
    const k = new Knapsack(weights, values, capacity);
    const a = k.generateSolutions();
    //a[i][j] = best value for using first 'i' items and capacity j
    expect(a.get(0)[0]).to.equal(0);
    expect(a.get(0)[1]).to.equal(0);
    expect(a.get(0)[2]).to.equal(0);
    expect(a.get(0)[3]).to.equal(0);
    expect(a.get(0)[4]).to.equal(0);
    expect(a.get(0)[5]).to.equal(0);

    expect(a.get(1)[0]).to.equal(0);
    expect(a.get(1)[1]).to.equal(0);
    expect(a.get(1)[2]).to.equal(0);
    expect(a.get(1)[3]).to.equal(0);
    expect(a.get(1)[4]).to.equal(0);
    expect(a.get(1)[5]).to.equal(5);
});


it("test basic cases 2", ()=>{
    let values = [1, 1];
    let capacity:number = 4;
    let weights = [2, 2];
    const k = new Knapsack(weights, values, capacity);
    const a = k.generateSolutions();
    //a[i][j] = best value for using first 'i' items and capacity j
    expect(a.get(0)[0]).to.equal(0);
    expect(a.get(0)[1]).to.equal(0);
    expect(a.get(0)[2]).to.equal(0);
    expect(a.get(0)[3]).to.equal(0);
    expect(a.get(0)[4]).to.equal(0);

    expect(a.get(1)[0]).to.equal(0);
    expect(a.get(1)[1]).to.equal(0);
    expect(a.get(1)[2]).to.equal(1);
    expect(a.get(1)[3]).to.equal(1);
    expect(a.get(1)[4]).to.equal(1);

    expect(a.get(2)[0]).to.equal(0);
    expect(a.get(2)[1]).to.equal(0);
    expect(a.get(2)[2]).to.equal(1);
    expect(a.get(2)[3]).to.equal(1);
    expect(a.get(2)[4]).to.equal(2);

});

it("test from the lecture", ()=>{
    let values = [3, 2, 4, 4];
    let capacity:number = 6;
    let weights = [4, 3, 2, 3];
    const k = new Knapsack(weights, values, capacity);
    const a = k.generateSolutions();
    //a[i][j] = best value for using first 'i' items and capacity j
    expect(a.get(0)[0]).to.equal(0);
    expect(a.get(0)[1]).to.equal(0);
    expect(a.get(0)[2]).to.equal(0);
    expect(a.get(0)[3]).to.equal(0);
    expect(a.get(0)[4]).to.equal(0);
    expect(a.get(0)[5]).to.equal(0);
    expect(a.get(0)[6]).to.equal(0);

    expect(a.get(1)[0]).to.equal(0);
    expect(a.get(1)[1]).to.equal(0);
    expect(a.get(1)[2]).to.equal(0);
    expect(a.get(1)[3]).to.equal(0);
    expect(a.get(1)[4]).to.equal(3);
    expect(a.get(1)[5]).to.equal(3);
    expect(a.get(1)[6]).to.equal(3);

    expect(a.get(2)[0]).to.equal(0);
    expect(a.get(2)[1]).to.equal(0);
    expect(a.get(2)[2]).to.equal(0);
    expect(a.get(2)[3]).to.equal(2);
    expect(a.get(2)[4]).to.equal(3);
    expect(a.get(2)[5]).to.equal(3);
    expect(a.get(2)[6]).to.equal(3);

    expect(a.get(3)[0]).to.equal(0);
    expect(a.get(3)[1]).to.equal(0);
    expect(a.get(3)[2]).to.equal(4);
    expect(a.get(3)[3]).to.equal(4);
    expect(a.get(3)[4]).to.equal(4);
    expect(a.get(3)[5]).to.equal(6);
    expect(a.get(3)[6]).to.equal(7);

    expect(a.get(4)[0]).to.equal(0);
    expect(a.get(4)[1]).to.equal(0);
    expect(a.get(4)[2]).to.equal(4);
    expect(a.get(4)[3]).to.equal(4);
    expect(a.get(4)[4]).to.equal(4);
    expect(a.get(4)[5]).to.equal(8);
    expect(a.get(4)[6]).to.equal(8);

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

    expect(a.get(2)[0]).to.equal(0);
    expect(a.get(2)[1]).to.equal(0);
    expect(a.get(2)[2]).to.equal(0);
    expect(a.get(2)[3]).to.equal(2);
    expect(a.get(2)[4]).to.equal(3);
    expect(a.get(2)[5]).to.equal(3);
    expect(a.get(2)[6]).to.equal(3);

    expect(a.get(3)[0]).to.equal(0);
    expect(a.get(3)[1]).to.equal(0);
    expect(a.get(3)[2]).to.equal(4);
    expect(a.get(3)[3]).to.equal(4);
    expect(a.get(3)[4]).to.equal(4);
    expect(a.get(3)[5]).to.equal(6);
    expect(a.get(3)[6]).to.equal(7);

    expect(a.get(4)[0]).to.equal(0);
    expect(a.get(4)[1]).to.equal(0);
    expect(a.get(4)[2]).to.equal(4);
    expect(a.get(4)[3]).to.equal(4);
    expect(a.get(4)[4]).to.equal(4);
    expect(a.get(4)[5]).to.equal(8);
    expect(a.get(4)[6]).to.equal(8);

});

it("test optimal", ()=>{
    //https://people.sc.fsu.edu/~jburkardt/datasets/knapsack_01/knapsack_01.html
    let values = [24, 13, 23, 15, 16];
    let capacity:number = 26;
    let weights = [12, 7, 11, 8, 9];
    const k = new Knapsack(weights, values, capacity);
    const a = k.generateSolutions();
    //a[i][j] = best value for using first 'i' items and capacity j
    expect(_.last(a.get(5))).to.equal(51);

    // using maxCols

    const k1 = new Knapsack(weights, values, capacity, 2);
    const a1 = k1.generateSolutions();
    //a[i][j] = best value for using first 'i' items and capacity j
    expect(a1.get(0)).to.equal(undefined);
    expect(a1.get(1)).to.equal(undefined);
    expect(a1.get(2)).to.equal(undefined);
    expect(a1.get(3)).to.equal(undefined);
    expect(_.last(a1.get(5))).to.equal(51);

    const k2 = new Knapsack(weights, values, capacity, 3);
    const a2 = k2.generateSolutions();
    //a[i][j] = best value for using first 'i' items and capacity j
    expect(a2.get(0)).to.equal(undefined);
    expect(a2.get(1)).to.equal(undefined);
    expect(a2.get(2)).to.equal(undefined);
    expect(_.last(a2.get(5))).to.equal(51);

});

it("test optimal2", ()=>{
    //https://people.sc.fsu.edu/~jburkardt/datasets/knapsack_01/knapsack_01.html
    let weights = [56, 59, 80, 64, 75, 17];
    let capacity:number = 190;
    let values = [50, 50, 64, 46, 50, 5];
    const k = new Knapsack(weights, values, capacity);
    const a = k.generateSolutions();
    expect(_.last(a.get(6))).to.equal(150);

    // using maxCols

    const k1 = new Knapsack(weights, values, capacity, 2);
    const a1 = k1.generateSolutions();
    expect(a1.get(0)).to.equal(undefined);
    expect(a1.get(1)).to.equal(undefined);
    expect(a1.get(2)).to.equal(undefined);
    expect(a1.get(3)).to.equal(undefined);
    expect(a1.get(4)).to.equal(undefined);
    expect(_.last(a1.get(6))).to.equal(150);

    const k2 = new Knapsack(weights, values, capacity, 3);
    const a2 = k2.generateSolutions();
    expect(a2.get(0)).to.equal(undefined);
    expect(a2.get(1)).to.equal(undefined);
    expect(a2.get(2)).to.equal(undefined);
    expect(a2.get(3)).to.equal(undefined);
    expect(_.last(a2.get(6))).to.equal(150);
});
