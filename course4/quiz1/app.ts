
import * as _ from 'lodash';
import fs from 'fs';
import {Hash} from './AdjList';
import {FloydWarshall} from './FloydWarshall';
import {Johnson} from './Johnson';
import {SSPath} from './Types';

const _process = (file:string)=>{
    console.log(file);
    fs.readFile(file, 'utf8', (err:any, data:any) => {
        if (err){
            throw err;
        }
        const lines = data.split('\n');
        lines.shift();
        const SEP = " ";
        const g:Hash = {};
        const nodes:string[] = [];
        let numEdges = 0;
        lines.forEach(line=>{
            line = line.replace(/\s+/g, SEP);
            const items:string[] = _.compact(line.split(SEP));
            const start = items[0] + "";
            const end = items[1] + "";
            const weight = parseInt(items[2]);
            g[start] = g[start] || [];
            g[start].push([start, end, weight]);
            numEdges++;
            if(!nodes.includes(start)){
                nodes.push(start)
            }
            if(!nodes.includes(end)){
                nodes.push(end)
            }
        });
        nodes.forEach(node=>{
            if(!g[node]){
                g[node] = [];
            }
        });
        console.log(file, Object.keys(g).length, "nodes");
        console.log(file, numEdges, "edges");
        try{
            //const minPath:SSPath = new FloydWarshall(g, {storeVertices: false}).getMinSP();
            const minPath:SSPath = new Johnson(g).getMinSP();
            console.log(file, minPath);
        }
        catch(e){
            console.log(file, "error", e);
        }

    });
};

//_process('./quiz1/g1.txt');
//_process('./quiz1/g2.txt');
_process('./quiz1/g3.txt');


/**


k 995
k 1000
./quiz1/g1.txt error Error: -ve cycle




k 1000
./quiz1/g2.txt error Error: -ve cycle
    at FloydWarshall.checkCycle (C:\workspace\coursera_algorithms\course4\dist\quiz1\FloydWarshall.js:88:27)
    at FloydWarshall.getAPSP (C:\workspace\coursera_algorithms\course4\dist\quiz1\FloydWarshall.js:155:18)
    at FloydWarshall.getMinSP (C:\workspace\coursera_algorithms\course4\dist\quiz1\FloydWarshall.js:100:27)
    at C:\workspace\coursera_algorithms\course4\dist\quiz1\app.js:64:92
    at FSReqCallback.readFileAfterClose [as oncomplete] (internal/fs/read_file_context.js:63:3)




./quiz1/g3.txt {
  vertices: [
    '399', '175', '177', '187', '200',
    '320', '225', '230', '79',  '307',
    '193', '58',  '182', '223', '179',
    '194', '217', '214', '36',  '258',
    '327', '351', '109', '189', '291',
    '279', '372', '278', '314', '401',
    '423', '515', '289', '566', '625',
    '438', '292', '454', '736', '771',
    '810', '895', '904'
  ],
  length: -19
}


**/
