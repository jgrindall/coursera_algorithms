
import * as _ from 'lodash';
import fs from 'fs';
import {AdjList} from './AdjList';
import {Prim, getTotalWeight} from './Prim';

// weight, length
type Job = [number, number];

const sortByWeightMinusLength = (job1:Job, job2:Job):number=>{
    const d1:number = job1[0] - job1[1];
    const d2:number = job2[0] - job2[1];
    if(d1 < d2){
        return 1;
    }
    else if(d1 > d2){
        return -1;
    }
    else{
        return job1[0] > job2[0] ? -1 : 1;
    }
};

const sortByRatio = (job1:Job, job2:Job):number=>{
    const d1:number = job1[0]/job1[1];
    const d2:number = job2[0]/job2[1];
    if(d1 < d2){
        return 1;
    }
    else if(d1 > d2){
        return -1;
    }
    else{
        return job1[0] > job2[0] ? -1 : 1;
    }
};

const getWeightedSum = (jobs:Array<Job>)=>{
    let weightedSum:number = 0;
    let compTime:number = 0;
    jobs.forEach(job=>{
        compTime += job[1];
        weightedSum += compTime*job[0];
    });
    return weightedSum;
};

fs.readFile('./quiz1/jobs.txt', 'utf8', (err:any, data:string) => {
    if (err){
        throw err;
    }
    const lines = data.split('\n');
    let jobs:Array<Job> = [];
    lines.forEach((line:string, i:number)=>{
        if(i >= 1){
            const parts:Array<string> = line.split(' ');
            jobs.push([
                parseInt(parts[0]),
                parseInt(parts[1])
            ]);
        }
    });
    let clone1 = JSON.parse(JSON.stringify(jobs));
    let clone2 = JSON.parse(JSON.stringify(jobs));
    const sortedJobs1 = clone1.sort(sortByWeightMinusLength);
    console.log('sort1', getWeightedSum(sortedJobs1));
    const sortedJobs2 = clone2.sort(sortByRatio);
    console.log('sort2', getWeightedSum(sortedJobs2));
});

fs.readFile('./quiz1/edges.txt', 'utf8', (err:any, data:string) => {
    if (err){
        throw err;
    }
    const g:AdjList = new AdjList();
    const lines = data.split('\n');
    lines.forEach((line:string, i:number)=>{
        if(i >= 1){
            const parts:Array<string> = line.split(' ');
            g.addNode(parts[0]);
            g.addNode(parts[1]);
        }
    });
    lines.forEach((line:string, i:number)=>{
        if(i >= 1){
            const parts:Array<string> = line.split(' ').map(s => s.trim());
            g.addEdge(parts[0], parts[1], parseInt(parts[2]));
            g.addEdge(parts[1], parts[0], parseInt(parts[2]));
        }
    });
    const mst:AdjList = new Prim(g).getMST();
    console.log('mst', getTotalWeight(mst.getHash()));

});
