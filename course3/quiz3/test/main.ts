import * as chai from 'chai';
import {Huffman, getMinPair, stringToTree} from "../Huffman";
import * as _ from "lodash";

let expect = chai.expect;

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

it("test tree", ()=>{
    let alphabet = ["a", "b", "c", "d", "e", "f"];
    let weights = [3, 2, 6, 8, 2, 6];
    console.log(new Huffman(alphabet, weights).generate());
});
