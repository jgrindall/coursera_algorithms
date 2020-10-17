
import * as _ from 'lodash';
import fs from 'fs';

/**

type Job = {
    'time':number,
    'deadline':number
};

const padLeft = (len:number, padder:string, input:string)=>{
    while(input.length < len){
        input = padder + input;
    }
    return input;
};

const toBin = (n:number, len:number):Array<boolean>=>{
    let remainders:Array<number> = [];
    while(n >= 1){
        remainders.push(n%2);
        n = Math.floor(n/2);
    }
    while(remainders.length < len){
        remainders.push(0);
    }
    return remainders.reverse().map(i => (i === 1));
};

const generateAllSubsets = <T>(a:Array<T>):Array<Array<T>>=>{
    const len = a.length;
    const max = Math.pow(2, len);
    const output:Array<Array<T>> = [];
    const bin = _.range(max).map(i=>{
        return toBin(i, len);
    });
    const add = (s:Array<boolean>):void=>{
        const r:Array<T> = [];
        for(let i = 0; i < len; i++){
            if(s[i]){
                r.push(a[i]);
            }
        }
        output.push(r);
    };
    for(let i = 0; i < bin.length; i++){
        add(bin[i]);
    }
    return output;
};

const getMaxLateness = (jobs:Array<Job>):number=>{
    let totalCompTime:number = 0;
    let compTimes:Array<number> = [];
    let lateness:Array<number> = [];
    jobs.forEach(job=>{
        const jobCompTime:number = totalCompTime + job.time;
        compTimes.push(jobCompTime);
        totalCompTime += job.time;
        lateness.push(Math.max(0, jobCompTime - job.deadline));
    });
    return _.max(lateness);
};

const option0:Array<Job> = (jobs:Array<Job>)=>{
    const clone:Array<Job> = JSON.parse(JSON.stringify(jobs));
    return _.sortBy(clone, job0 =>{
        return job0
    });
};

const jobs:Array<Job> =
[

];

**/


const getLateness  = (a, b, c)=>{
    const lateness0 = Math.max(0, a[0] - a[1]);
    const lateness1 = Math.max(0, a[0] + b[0] - b[1]);
    const lateness2 = Math.max(0, a[0] + b[0] + c[0] - c[1]);
    return Math.max(lateness0, lateness1, lateness2);
};

let n = 0;

while(true){
    const get = ()=>Math.round(Math.random()*5);
    const a = [get(), get()];
    const b = [get(), get()];
    const c = [get(), get()];
    const latenessABC = getLateness(a, b, c);
    const latenessBAC = getLateness(b, a, c);
    const latenessACB = getLateness(a, c, b);
    const latenessCAB = getLateness(c, a, b);
    const latenessBCA = getLateness(b, c, a);
    const latenessCBA = getLateness(c, b, a);
    const best = _.min([latenessABC, latenessBAC, latenessACB, latenessCAB, latenessBCA, latenessCBA]);
    if(a[1] < b[1] && b[1] < c[1] && best < latenessABC){
        console.log(a, b, c, "ordered by deadline failed");
    }
    n++;
}
