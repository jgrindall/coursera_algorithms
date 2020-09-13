import * as chai from 'chai';
import {Hash, AdjList} from "../AdjList";
import * as _ from "lodash";

let expect = chai.expect;

describe("description", () => {

    it("contract works", () =>{
        const hash:Hash = {
            '0':[
                '1',
                '2',
                '3'
            ],
            '1':[
                '2',
                '4',
                '3',
                '0'
            ],
            '2':[
                '5',
                '3',
                '0',
                '1'
            ],
            '3':[
                '1',
                '2',
                '0',
                '5'
            ],
            '4':[
                '1'
            ],
            '5':[
                '3',
                '2'
            ]
        };
        const g:AdjList = new AdjList();
        g.setHash(hash);
        const c1 = g.contract('2', '3');
        console.log(c1.getHash());
        const c2 = g.contract('2,3', '1');
        console.log(c2.getHash());
        const c3 = g.contract('2,3,1', '5');
        console.log(c3.getHash());
    });

});
