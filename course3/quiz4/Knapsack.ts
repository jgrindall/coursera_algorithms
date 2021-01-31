import * as _ from "lodash";

const fill = (a:number[], start:number, end:number, fillWith:number)=>{
    for(let i = start; i <= end; i++){
        a[i] = fillWith;
    }
}

export class Knapsack{
    private weights:number[] = [];
    private values:number[] = [];
    private capacity:number;
    private solutions:Map<number, number[]> = new Map<number, number[]>();
    private maxColumns:number = Infinity;

    constructor(weights:number[], values:number[], capacity:number, maxColumns:number = Infinity){
        this.weights = weights;
        this.values = values;
        if(weights.length !== values.length){
            throw new Error("mismatch");
        }
        this.capacity = capacity;
        if(maxColumns <= 1){
            throw new Error("maxColumns >= 2");
        }
        this.maxColumns = maxColumns;
    }
    getSolutions():Map<number, number[]>{
        return this.solutions;
    }
    getColumn(i:number):number[]{
        return this.solutions.get(i);
    }
    createColumn(i:number){
        this.solutions.set(i, []);
    }
    setInColumn(i:number, c:number, val:number){
        this.getColumn(i)[c] = val;
    }
    fillColumn(i:number){
        this.createColumn(i);
        const prevColumn:number[] = this.getColumn(i - 1);
        for(let c = 0; c <= this.capacity; c++){
            // do not use the ith item
            const _without = prevColumn[c];
            // with the ith item
            let _with = -Infinity;
            if(c - this.weights[i - 1] >= 0){
                _with = this.values[i - 1] + prevColumn[c - this.weights[i - 1]];
            }
            this.setInColumn(i, c, Math.max(_without, _with));
        }
    }
    prune(i:number){
        if(i >= this.maxColumns){
            this.solutions.delete(i - this.maxColumns);
        }
    }
    generateSolutions(){
        this.createColumn(0);
        fill(this.solutions.get(0), 0, this.capacity, 0);
        for(let i = 1; i <= this.weights.length; i++){
            this.fillColumn(i);
            this.prune(i);
        }
        return this.solutions;
    }
}
