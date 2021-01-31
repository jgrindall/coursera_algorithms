
import * as _ from 'lodash';
import fs from 'fs';
import {Knapsack} from "./Knapsack";

fs.readFile('./quiz4/k1.txt', 'utf8', (err:any, data:string) => {
    if (err){
        throw err;
    }
    const lines = data.split('\n');
    const line0 = lines.shift();
    const capacity = parseInt(line0.split(" ")[0]);
    console.log("capacity", capacity);

    const weights = [];
    const values = [];
    lines.forEach(line=>{
        const data = line.split(" ").map(a=>parseInt(a.trim()));
        weights.push(data[0]);
        values.push(data[1]);
    });
    console.log(weights.length, values.length);
    const k = new Knapsack(weights, values, capacity);
    const a = k.generateSolutions();
    console.log(_.last(_.last(a)));
});


fs.readFile('./quiz4/k2.txt', 'utf8', (err:any, data:string) => {
    if (err){
        throw err;
    }
    const lines = data.split('\n');
    const line0 = lines.shift();
    const capacity = parseInt(line0.split(" ")[0]);
    console.log("capacity", capacity);

    const weights = [];
    const values = [];
    lines.forEach(line=>{
        const data = line.split(" ").map(a=>parseInt(a.trim()));
        weights.push(data[0]);
        values.push(data[1]);
    });
    console.log(weights.length, values.length);
    const k = new Knapsack(weights, values, capacity);
    const a = k.generateSolutions();
    console.log(_.last(_.last(a)));
});
