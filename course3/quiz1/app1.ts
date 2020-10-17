
import * as _ from 'lodash';
import fs from 'fs';

type Job = [number, number];

const generateJobs = (n:number):Array<Job>=>{
    const generateJob = ():Job=>{
        const j:Job = [Math.random()*n, Math.random()*n];
        j.sort();
        return j;
    };
    return _.range(n).map(generateJob);
};

const inside = (v:number, j:Job):boolean => (v >= j[0] && v <= j[1]);

const overlap = (j1:Job, j2:Job):boolean=>{
    return inside(j1[0], j2) || inside(j1[1], j2) ||  inside(j2[0], j1) || inside(j2[1], j1);
}

type JobPicker = (a:Array<Job>)=>Job;

const getSubset = (jobs:Array<Job>, strategy:JobPicker):Array<Job>=>{
    const chosen:Array<Job> = [];
    let remaining:Array<Job> = [];
    jobs.forEach(j=>{
        remaining.push([j[0], j[1]]);
    });
    while(true){
        const job:Job = strategy(remaining);
        if(job){
            chosen.push(job);
            remaining = remaining.filter((j:Job)=>{
                return j !== job && !overlap(j, job);
            });
        }
        else{
            break;
        }
    }
    return chosen;
};

const earliestEndTime:JobPicker = (a:Array<Job>):Job=>{
    return _.sortBy(a, j=>j[1])[0];
};

const leastConflicts:JobPicker = (a:Array<Job>):Job=>{
    const numC = (j:Job)=>{
        let n:number = 0;
        a.forEach(job=>{
            if(j !== job && overlap(j, job)){
                n++;
            }
        });
        return n;
    };
    return _.sortBy(a, j=>numC(j))[0];
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

const isValid = (a:Array<Job>):boolean=>{
    for(let i = 0; i < a.length - 1; i++){
        for(let j = i + 1; j < a.length; j++){
            if(overlap(a[i], a[j])){
                return false;
            }
        }
    }
    return true;
};

const bruteForce = (a:Array<Job>)=>{
    const allSubsets:Array<Array<Job>> = generateAllSubsets(a);
    let max = -Infinity;
    let bestSchedule = null;
    allSubsets.forEach((s:Array<Job>)=>{
        if(isValid(s) && s.length > max){
            max = s.length;
            bestSchedule = s;
        }
    });
    return bestSchedule;
};

const check = (jobs:Array<Job>):void=>{
    //const bf:Array<Job> = bruteForce(jobs);
    const es:Array<Job> = getSubset(jobs, earliestEndTime);
    const lc:Array<Job> = getSubset(jobs, leastConflicts);
    //console.log(es.length, lc.length);
    console.log('lc', lc, lc.length);
    console.log('es', es, es.length);
};

const jobs:Array<Job> =

[
  [ 75, 90 ],
  [ 120, 180 ],
  [ 20, 50 ],
  [ 140, 170 ],
  [ 100, 150 ],
  [ 60, 80 ],
  [ 82, 130 ],
  [ 30, 35 ],
  [ 10, 70 ]
];

check(jobs);
