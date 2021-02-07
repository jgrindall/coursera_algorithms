import * as _ from "lodash";

// c ij = min over r (r=i..j )  sumk=i..k=j)pk  + Ci(r-1) + C(r+1)j

export class Node{
    private _val:number;
    private _left?:Node;
    private _right?:Node;
    constructor(val:number){
        this._val = val;
    }
    public getNumChildren():number{
        let n:number  = 0;
        if(this.getLeft()){
            n++;
        }
        if(this.getRight()){
            n++;
        }
        return n;
    }
    public setVal(val:number){
        this._val = val;
    }
    public addLeft(n:Node):void{
        this._left = n;
    }
    public addRight(n:Node):void{
        this._right = n;
    }
    public getLeft():Node | undefined{
        return  this._left;
    }
    public getRight():Node | undefined{
        return this._right;
    }
    public getVal():number{
        return this._val;
    }
}

export class OptSearchTree{
    private probabilities:number[];
    private solutions:number[][];
    sumCache:Map<string, number>;

    constructor(probabilities:number[]){
        this.probabilities = probabilities;
        this.sumCache = new Map<string, number>();
    }
    getSolutions():number[][]{
        return this.solutions;
    }
    sumProbabilities(i:number, j:number){
        const key:string = i + "-" + j;
        if(!this.sumCache.has(key)){
            const val:number = _.range(i, j + 1).reduce((memo, index)=>{
                return memo + this.probabilities[index - 1];
            }, 0);
            this.sumCache.set(key, val);
        }
        return this.sumCache.get(key);
    }
    generate(){
        this.solutions = [];
        for(let i = 0; i <= this.probabilities.length; i++){
            this.solutions[i]  = [];
        }
        for(let size = 0; size <= this.probabilities.length - 1; size++){
            for(let i = 1; i <= this.probabilities.length - size; i++){
                const j = i + size;
                const mins = _.range(i, j + 1).map(r => {
                    const s0 = (i <= r - 1 ? this.solutions[i][r - 1] : 0);
                    const s1 = (r + 1 <= j ? this.solutions[r + 1][j] : 0);
                    return this.sumProbabilities(i, j) + s0 + s1;
                });
                this.solutions[i][j] = _.min(mins);
            }
        }
        return this.solutions[1][this.probabilities.length];
    }
}
