"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = __importStar(require("chai"));
const Karatsuba_1 = require("../Karatsuba");
let expect = chai.expect;
describe("description", () => {
    it("check BigInt", () => {
        expect(String(BigInt('3141592653589793238462643383279502884197169399375105820974944592'))).to.equal('3141592653589793238462643383279502884197169399375105820974944592');
    });
    it("multiplies simple numbers", () => {
        expect(Karatsuba_1.Karatsuba.multiply('1', '1')).to.equal('1');
        expect(Karatsuba_1.Karatsuba.multiply('1', '2')).to.equal('2');
        expect(Karatsuba_1.Karatsuba.multiply('2', '1')).to.equal('2');
        expect(Karatsuba_1.Karatsuba.multiply('10', '1')).to.equal('10');
        expect(Karatsuba_1.Karatsuba.multiply('1', '10')).to.equal('10');
        expect(Karatsuba_1.Karatsuba.multiply('10', '10')).to.equal('100');
        expect(Karatsuba_1.Karatsuba.multiply('10', '10')).to.equal('100');
        expect(Karatsuba_1.Karatsuba.multiply('11', '12')).to.equal('132');
        expect(Karatsuba_1.Karatsuba.multiply('12', '11')).to.equal('132');
        expect(Karatsuba_1.Karatsuba.multiply('4', '16')).to.equal('64');
        expect(Karatsuba_1.Karatsuba.multiply('34', '78')).to.equal('2652');
        expect(Karatsuba_1.Karatsuba.multiply('345', '789')).to.equal('272205');
        expect(Karatsuba_1.Karatsuba.multiply('46', '134')).to.equal('6164');
    });
    it("multiplies large numbers", () => {
        expect(Karatsuba_1.Karatsuba.multiply('12345', '6789')).to.equal('83810205');
    });
    it("multiplies large numbers - loop", () => {
        const NUM = 10;
        const rnd = () => (1 + Math.floor(Math.random() * 100000000));
        for (let i = 0; i < NUM; i++) {
            const a = rnd(), b = rnd();
            expect(Karatsuba_1.Karatsuba.multiply('' + a, '' + b)).to.equal('' + (a * b));
        }
    });
    it("multiplies very large numbers", () => {
        const a = '3141592653589793238462', b = '27182818284590452353602';
        expect(Karatsuba_1.Karatsuba.multiply(a, b)).to.equal(String(BigInt(a) * BigInt(b)));
    });
    it("multiplies very large numbers", () => {
        const a = '31415926535897932384626433832', b = '2718281828459045235360287471';
        expect(Karatsuba_1.Karatsuba.multiply(a, b)).to.equal(String(BigInt(a) * BigInt(b)));
        expect(Karatsuba_1.Karatsuba.multiply(a, b)).to.equal('85397342226735670654635508682225413374608447645080118872');
    });
    it("multiplies very very large numbers", () => {
        const a = '3141592653589793238462643383279502884197169399375105820974944592', b = '2718281828459045235360287471352662497757247093699959574966967627';
        expect(Karatsuba_1.Karatsuba.multiply(a, b)).to.equal(String(BigInt(a) * BigInt(b)));
        expect(Karatsuba_1.Karatsuba.multiply(a, b)).to.equal('8539734222673567065463550869546574495034888535765114961879601127067743044893204848617875072216249073013374895871952806582723184');
    });
});
//# sourceMappingURL=main.js.map