import * as _ from "lodash";

export type Path = {
    vertices:number[],
    weight:number
};

export class MaxWeight{
    private weights:number[] = [];
    private solutions:Path[] = [];
    constructor(weights:number[]){
        this.weights = weights;
        this.prepopulate();
    }
    getBestPath(len?:number):Path{
        if(!len){
            len = this.weights.length;
        }
        return this.solutions[len];
    }
    prepopulate(){
        this.solutions[0] = {
            vertices:[],
            weight:0
        };
        this.solutions[1] = {
            vertices:[0],
            weight:this.weights[0]
        };

        this.solutions[2] = (this.weights[0] >= this.weights[1] ? {
            vertices:[0],
            weight:this.weights[0]
        } : {
            vertices:[1],
            weight:this.weights[1]
        });
        for(let i = 3; i <= this.weights.length; i++){
            const min1:Path = this.solutions[i - 1];
            const min2:Path = this.solutions[i - 2];
            this.solutions[i] = (min1.weight >= min2.weight + this.weights[i - 1]) ? {
                vertices:min1.vertices,
                weight:min1.weight
            } : {
                vertices:[...min2.vertices, i - 1],
                weight:min2.weight + this.weights[i - 1]
            };
        }
    }
}
