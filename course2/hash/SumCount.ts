import * as _ from "lodash";


type SimpleHash = {
    [key: string]: boolean
}

type Hash = {
    [key: string]: SimpleHash
};

export class SumCount{
    private list:Array<number> = [];
    private hash:Hash;
    private range:number;

    constructor(list:Array<number>, range:number){
        this.list = list;
        this.range = range;
        this.hash = {

        };
        this.list.forEach((n:number)=>{
            const bucket = '' + Math.floor(-n/this.range);
            if(!this.hash[bucket]){
                this.hash[bucket] = {};
            }
            this.hash[bucket]['' + n] = true;
        });
    }

    start(){
        const result = {};
        for(let i:number = 0; i < this.list.length; i++){
            const x:number = this.list[i];
            let floor = Math.floor(x/this.range);
            if(floor === -0){
                floor = 0;
            }
            const bucket0:SimpleHash = this.hash['' + floor];
            const bucket1:SimpleHash = this.hash['' + (floor - 1)];
            const bucket2:SimpleHash = this.hash['' + (floor + 1)];
            const inspect = (simpleHash:SimpleHash)=>{
                if(simpleHash){
                    Object.keys(simpleHash).forEach(key =>{
                        const val:number = parseInt(key);
                        const total:number = x + val;
                        if(x !== val && total <= this.range && total >= -this.range){
                            if(!result[total]){
                                result[total] = [];
                            }
                            result[total].push([x, val]);
                        }
                    });
                }
            };
            inspect(bucket0);
            inspect(bucket1);
            inspect(bucket2);
        }
        return result;
    }

}
