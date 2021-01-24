
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
    [1, 2, 3, 4, 17, 117, 517, 997].forEach(i => {
        console.log(i, ":", maxPath.vertices.includes(i));
    });
});
