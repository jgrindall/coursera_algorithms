
import * as _ from 'lodash';
import fs from 'fs';
import {Huffman} from "./Huffman";
import {stringToTree, getDepth, Node} from "./Node";
import {MaxWeight, Path} from "./MaxWeight";

fs.readFile('./quiz3/huffman.txt', 'utf8', (err:any, data:string) => {
    if (err){
        throw err;
    }
    const weights = data.split('\n').map(s=>parseInt(s.trim().replace(/ /g, '')));
    let alphabet = _.range(1000).map(i=>"s" + i);
    const tree:Node<string> = stringToTree(new Huffman(alphabet, weights).generate());
    const codewords:Record<string, number> = {};
    let minLength:number = Infinity, maxLength:number = -Infinity;
    alphabet.forEach((s:string, i:number)=>{
        const d:number = getDepth(tree, s);
        if(d < minLength){
            minLength = d;
        }
        if(d > maxLength){
            maxLength = d;
        }
        codewords[s] = d;
    });
    console.log(minLength, maxLength);
});

fs.readFile('./quiz3/wis.txt', 'utf8', (err:any, data:string) => {
    const weights = data.split('\n').map(s=>parseInt(s.trim().replace(/ /g, '')));
    const maxPath:Path = new MaxWeight(weights).getBestPath();
    console.log(maxPath);
    [0, 1, 2, 3, 16, 116, 516, 996].forEach(i => {
        console.log(i, ":", maxPath.vertices.includes(i));
    });
});

(()=>{

    const weights = [0.32, 0.25, 0.20, 0.18, 0.05];
    let alphabet = ['a', 'b', 'c', 'd', 'e'];

    const TOTAL = 1000;

    const treeS:string = new Huffman(alphabet, weights).generate();
    const tree:Node<string> = stringToTree(treeS);

    console.log(treeS);
    console.log(tree);

    const codewords:Record<string, number> = {};

    let len = 0;

    alphabet.forEach((s:string, i:number)=>{
        const d:number = getDepth(tree, s);

        const numExpected = weights[i]*TOTAL;

        len += numExpected * d;

        console.log(s, "depth", d, "numExpected", numExpected, "totalbits", numExpected*d);


        codewords[s] = d;
    });


    console.log(codewords);

    console.log(len);




})();







(()=>{

    const weights = [0.48, 0.26, 0.26];
    let alphabet = ['a', 'b', 'c'];

    const treeS:string = new Huffman(alphabet, weights).generate();
    const tree:Node<string> = stringToTree(treeS);

    console.log(treeS);
    console.log(tree);


})();


let alphabet = ["a", "b", "c", "d", "e"];
const correctAnswers:string[] = ["0", "10", "110", "111"];
let weights = [0.28, 0.27, 0.2, 0.15, 0.1];
const tree:string = new Huffman(alphabet, weights).generate();
console.log('tree', tree);
// tree -  (-(a)(b))    (-(c)(-(d)(e)))
const node:Node<string> = stringToTree(tree);
let totalWeight = 0;
alphabet.forEach((a:string, i:number)=>{
    const d = getDepth(node, a);
    console.log(a, d);
    totalWeight += d*weights[i];
});
console.log(totalWeight);
