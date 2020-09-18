import * as chai from 'chai';
import {Strassen} from "../Strassen";
import {Matrix, standardMult} from "../Matrix";
let expect = chai.expect;

describe("description", () => {

    it("check decompos", () =>{
        let x = [[0, 2], [5, 3]]
        expect(Strassen.decompose(x).augmented).to.equal(false);
        x = [[0, 2, 3, 4], [5, 3, 0, 6], [1, 7, 4, 1], [0, 4, 3, 2]];
        expect(Strassen.decompose(x).augmented).to.equal(false);
        x = [[0, 2, 3, 4, 6, 5], [5, 3, 0, 6, 1, 4], [1, 7, 4, 1, 8, 4], [0, 4, 3, 2, 0, 0], [0, 4, 3, 2, 0, 0], [0, 4, 3, 2, 0, 0]];
        expect(Strassen.decompose(x).augmented).to.equal(false);
        x = [[0, 2, 4], [5, 3, 1], [5, 3, 2]]
        expect(Strassen.decompose(x).augmented).to.equal(true);
        x = [[0, 2, 3, 4, 7], [1, 5, 3, 0, 6], [1, 7, 4, 1, 2], [0, 4, 3, 2, 3], [0, 4, 3, 2, 3]];
        expect(Strassen.decompose(x).augmented).to.equal(true);
        x = [[0, 2, 3, 4, 6, 5, 1], [5, 3, 0, 6, 1, 4, 4], [1, 7, 4, 1, 8, 4, 3], [0, 4, 3, 2, 0, 0, 1], [0, 4, 3, 2, 0, 0, 1], [0, 4, 3, 2, 0, 0, 3], [0, 4, 3, 2, 0, 0, 3]];
        expect(Strassen.decompose(x).augmented).to.equal(true);
    });

    it("check decompos 4", () =>{
        const x = [[0, 2, 3, 4], [5, 3, 0, 6], [1, 7, 4, 1], [0, 4, 3, 2]];
        const dec = Strassen.decompose(x);
        const join = Strassen.join(dec);
        for(let i = 0; i < x.length; i++){
            for(let j = 0; j < x.length; j++){
                expect(join[i][j]).to.equal(x[i][j]);
            }
        }
    });

    it("check decompose 5", () =>{
        const x = [[0, 2, 3, 4, 4], [5, 3, 0, 6, 1], [1, 7, 4, 1, 0], [0, 4, 3, 2, 5], [5, 7, 3, 5, 7]];
        const dec = Strassen.decompose(x);
        const join = Strassen.join(dec);
        for(let i = 0; i < x.length; i++){
            for(let j = 0; j < x.length; j++){
                expect(join[i][j]).to.equal(x[i][j]);
            }
        }
    });

    it("check mult", () =>{
        const x = [[0, 2], [5, 3]];
        const y = [[-1, 2], [2, 0]];
        const m = Strassen.multiply(x, y);
        expect(m[0][0]).to.equal(4);
        expect(m[0][1]).to.equal(0);
        expect(m[1][0]).to.equal(1);
        expect(m[1][1]).to.equal(10);
    });

    const generate = (n:number):Matrix=>{
        const out = [];
        for(let i = 0; i < n; i++){
            out[i] = [];
            for(let j = 0; j < n; j++){
                out[i][j] = Math.floor(Math.random()*20) - 10;
            }
        }
        return out;
    };

    const checkN = (n:number)=>{
        const a = generate(n), b = generate(n);
        const standard = standardMult(a, b);
        const strassen = Strassen.multiply(a, b);
        for(let i = 0; i < a.length; i++){
            for(let j = 0; j < a.length; j++){
                expect(standard[i][j]).to.equal(strassen[i][j]);
            }
        }
    };

    it("check mult 3", () =>{
        checkN(3);
    });

    it("check mult 4", () =>{
        checkN(4);
    });

    it("check mult 5", () =>{
        checkN(5);
    });

    it("check mult 6", () =>{
        checkN(6);
    });

    it("check mult 7", () =>{
        checkN(7);
    });

});
