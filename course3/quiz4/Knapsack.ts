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
    private solutions:number[][] = [];
    constructor(weights:number[], values:number[], capacity:number){
        this.weights = weights;
        this.values = values;
        this.capacity = capacity;
    }
    getSolutions(){
        return this.solutions;
    }
    generateSolutions(){
        this.solutions = [[]];
        fill(this.solutions[0], 0, this.capacity, 0);
        for(let i = 1; i <= this.weights.length; i++){
            this.solutions[i] = [];
            for(let c = 0; c <= this.capacity; c++){
                // do not use the ith item
                const _without = this.solutions[i - 1][c];
                // with the ith item
                let _with = -Infinity;
                if(c - this.weights[i - 1] >= 0){
                    _with = this.values[i - 1] + this.solutions[i - 1][c - this.weights[i - 1]];
                }
                this.solutions[i][c] = Math.max(_without, _with);
            }
        }
        return this.solutions;
    }
}
