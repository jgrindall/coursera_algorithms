import * as _ from "lodash";

const fill = (a:number[], start:number, end:number, fillWith:number)=>{
    for(let i = start; i <= end; i++){
        a[i] = fillWith;
    }
}

export type MisMatcher = (a:String, b:string)=>number;

export class SeqAlignment{
    private penaltyGap:number;
    private penaltyMismatcher:MisMatcher;
    private seq0:string;
    private seq1:string;
    private solutions:number[][];

    constructor(seq0:string, seq1:string, penaltyGap:number, penaltyMismatcher:MisMatcher){
        this.seq0 = seq0;
        this.seq1 = seq1;
        this.penaltyGap = penaltyGap;
        this.penaltyMismatcher = penaltyMismatcher;
    }
    getSolutions():number[][]{
        return this.solutions;
    }
    getPenaltyMismatch(i:number, j:number):number{
        const char0:string = this.seq0.charAt(i);
        const char1:string = this.seq1.charAt(j);
        return this.penaltyMismatcher(char0, char1);
    }
    generateSolutions(){
        this.solutions = [];
        for(let i = 0; i <= this.seq0.length; i++){
            this.solutions[i] = [];
            for(let j = 0; j <= this.seq1.length; j++){
                if(i === 0 && j === 0){
                    this.solutions[i][j] = 0;
                }
                else if(i === 0){
                    this.solutions[i][j] = j*this.penaltyGap;
                }
                else if(j === 0){
                    this.solutions[i][j] = i*this.penaltyGap;
                }
            }
        }
        for(let i = 1; i <= this.seq0.length; i++){
            for(let j = 1; j <= this.seq1.length; j++){
                const match = this.solutions[i - 1][j - 1] + this.getPenaltyMismatch(i- 1, j - 1);
                const gap0 = this.solutions[i - 1][j] + this.penaltyGap;
                const gap1 = this.solutions[i][j - 1] + this.penaltyGap;
                this.solutions[i][j] = Math.min(match, gap0, gap1);
            }
        }
        return this.solutions;
    }
}
