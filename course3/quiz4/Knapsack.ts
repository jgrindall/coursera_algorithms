import * as _ from "lodash";

const fill = <T>(a:T[], start:number, end:number, fillWith:(()=>T))=>{
    for(let i = start; i <= end; i++){
        a[i] = (fillWith as ()=>T)();
    }
}

class KnapsackContents{
    public weights:number[] = [];
    public totalWeight:number = 0;
    public totalValue:number = 0;
}

export class Knapsack{
    private weights:number[] = [];
    private values:number[] = [];
    private capacity:number;
    private solutions:Map<number, KnapsackContents[]> = new Map<number, KnapsackContents[]>();
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
    getSolutions():Map<number, KnapsackContents[]>{
        return this.solutions;
    }
    getColumn(i:number):KnapsackContents[]{
        return this.solutions.get(i);
    }
    createColumn(i:number){
        this.solutions.set(i, []);
    }
    setInColumn(i:number, c:number, totalValue:number, totalWeight:number, weights:number[]){
        const entry = new KnapsackContents();
        entry.totalWeight = totalWeight;
        entry.weights = weights;
        entry.totalValue = totalValue;
        this.getColumn(i)[c] = entry;
    }
    fillColumn(i:number){
        this.createColumn(i);
        const prevColumn:KnapsackContents[] = this.getColumn(i - 1);
        for(let c = 0; c <= this.capacity; c++){
            // do not use the ith item
            const _without = prevColumn[c].totalValue;
            // with the ith item
            let _with = 0;
            if(c - this.weights[i - 1] >= 0){
                _with = this.values[i - 1] + prevColumn[c - this.weights[i - 1]].totalValue;
            }
            if(_with > _without){
                // use it
                this.setInColumn(i, c, _with, prevColumn[c - this.weights[i - 1]].totalWeight + this.weights[i - 1], [...prevColumn[c - this.weights[i - 1]].weights, i - 1]);
            }
            else{
                // don't use it
                this.setInColumn(i, c ,_without, prevColumn[c].totalWeight, [...prevColumn[c].weights]);
            }
        }
    }
    prune(i:number){
        if(i >= this.maxColumns){
            this.solutions.delete(i - this.maxColumns);
        }
    }
    generateSolutions():Map<number, KnapsackContents[]>{
        this.createColumn(0);
        fill(this.solutions.get(0), 0, this.capacity, ()=>new KnapsackContents());
        for(let i = 1; i <= this.weights.length; i++){
            this.fillColumn(i);
            this.prune(i);
        }
        return this.solutions;
    }
}
