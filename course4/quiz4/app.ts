import {AdjList} from "./AdjList";
//import {Scc} from "./Scc";
import * as _ from 'lodash';
//import {Components} from "./Types";
import fs from 'fs';

const getLit = (s:string)=>{
    if(s.charAt(0) === "-"){
        return "not:" + s.substr(1);
    }
    return ":" + s;
};

const getNot = (s:string)=>{
    if(s.charAt(0) === "-"){
        return ":" + s.substr(1);
    }
    return "not:" + s;
};

fs.readFile('./quiz4/sat1.txt', 'utf8', (err:any, data:string) => {
    if (err){
        throw err;
    }
    const lines = data.split('\n');
    lines.shift();
    const SEP = " ";
    const numVariables = lines.length;
    // variables are 1...numVariables
    const g:AdjList = new AdjList();
    for(let i = 1; i <= numVariables; i++){
        g.addNode(":" + i);
        g.addNode("not:" + i);
    }
    console.log('building graph...');
    lines.forEach(line=>{
        line = line.replace(/\s+/g, SEP);
        const items = _.compact(line.split(SEP));
        const xString:string = items[0] + "";
        const yString:string = items[1] + "";
        const xLit = getLit(xString);
        const yLit = getLit(yString);
        const xLitNot = getNot(xString);
        const yLitNot = getNot(yString);

        // not x to y
        g.addEdge(xLitNot, yLit);
        // not y to x
        g.addEdge(yLitNot, xLit);
    });

    console.log('scc');

    //const scc:Components = new Scc(g).getScc();

});
