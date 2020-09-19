import * as chai from 'chai';
import {Hash, AdjList} from "../AdjList";
import * as _ from "lodash";
import {Dfs} from "../Dfs";

let expect = chai.expect;

const getGraph = ():Hash=>{
    return {
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
};

describe("description", () => {

    it("finds dist for simple graph a-a", () =>{
        
    });

});
