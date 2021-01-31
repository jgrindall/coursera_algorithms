
import * as _ from 'lodash';
import fs from 'fs';
import {Knapsack} from "./Knapsack";

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
            weights.push(data[0]);
            values.push(data[1]);
        });
        const k = new Knapsack(weights, values, capacity);
        const a = k.generateSolutions();
        console.log(_.last(a.get(weights.length)));
    });
};

solve('./quiz4/k1.txt');
solve('./quiz4/k2.txt', 2);
