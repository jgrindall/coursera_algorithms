
import * as _ from 'lodash';
import fs from 'fs';
import {Knapsack} from "./Knapsack";
import {OptSearchTree} from "./OptSearchTree";

const solve = (file:string, maxCols?:number)=>{
    fs.readFile(file, 'utf8', (err:any, data:string) => {
        if (err){
            throw err;
        }
        const lines = data.split('\n');
        const line0 = lines.shift();
        const capacity = parseInt(line0.split(" ")[0]);
        const weights = [];
        const values = [];
        lines.forEach(line=>{
            const data = line.split(" ").map(a=>parseInt(a.trim()));
            values.push(data[0]);
            weights.push(data[1]);
        });
        const k = new Knapsack(weights, values, capacity, maxCols);
        const a = k.generateSolutions();
        console.log(_.last(a.get(weights.length)));
    });
};

solve('./quiz4/k1.txt');
solve('./quiz4/k2.txt', 2);

let probabilities = [0.05, 0.4, 0.08, 0.04, 0.1, 0.1, 0.23];
let opt = new OptSearchTree(probabilities);
console.log(opt.generate());


probabilities = [0.2, 0.05, 0.17, 0.1, 0.2, 0.03, 0.25];
opt = new OptSearchTree(probabilities);
console.log(opt.generate());
