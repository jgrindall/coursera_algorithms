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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = __importStar(require("chai"));
const InversionCounter_1 = require("../InversionCounter");
let expect = chai.expect;
const bruteForce = (a) => {
    let n = 0;
    for (let i = 0; i < a.length - 1; i++) {
        for (let j = i + 1; j < a.length; j++) {
            if (a[i] > a[j]) {
                n++;
            }
        }
    }
    return n;
};
describe("description", () => {
    const comp = (a, b) => {
        return a <= b;
    };
    const check = (a) => {
        const ans = InversionCounter_1.InversionCounter.sortAndCount(a, comp);
        expect(ans.a.length).to.equal(a.length);
        if (a.length >= 2) {
            for (let i = 0; i < ans.a.length - 1; i++) {
                expect(ans.a[i] <= ans.a[i + 1]).to.equal(true);
            }
        }
        expect(ans.n).to.equal(bruteForce(a));
    };
    it("check empty", () => {
        const ans = InversionCounter_1.InversionCounter.sortAndCount([], comp);
        expect(Array.isArray(ans.a)).to.equal(true);
        expect(ans.a.length).to.equal(0);
        expect(ans.n).to.equal(0);
    });
    it("check basic", () => {
        check([1]);
        check([1, 1]);
        check([0, 1]);
        check([1, 0]);
        check([1, 1, 1]);
        check([1, 0, 0]);
        check([0, 1, 0]);
        check([0, 0, 1]);
        check([1, 1, 0]);
        check([0, 1, 1]);
        check([1, 0, 1]);
    });
    it("check", () => {
        check([1, 2, 3, 4, 5, 6]);
        check([6, 5, 4, 3, 2, 1]);
        check([1, 4, 5, 2, 6, 3]);
        check([2, 4, 5, 3, 4, 1]);
    });
    it("check large arrays", () => {
        const a = [];
        for (let i = 0; i < 200; i++) {
            a.push(Math.floor(Math.random() * 10));
        }
        check(a);
        const b = [];
        for (let i = 0; i < 200; i++) {
            b.push(Math.floor(Math.random() * 1000));
        }
        check(b);
    });
});
//# sourceMappingURL=main.js.map