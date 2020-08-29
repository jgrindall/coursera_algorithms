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
const MergeSort_1 = require("../MergeSort");
let expect = chai.expect;
describe("description", () => {
    const comp = {
        isLessThan: (a, b) => {
            return a < b;
        }
    };
    const check = a => {
        const ans = MergeSort_1.MergeSort.sort(a, comp);
        expect(ans.length).to.equal(a.length);
        if (a.length >= 2) {
            for (let i = 0; i < ans.length - 1; i++) {
                expect(ans[i] <= ans[i + 1]).to.equal(true);
            }
        }
    };
    it("check empty", () => {
        const ans = MergeSort_1.MergeSort.sort([], comp);
        expect(Array.isArray(ans)).to.equal(true);
        expect(ans.length).to.equal(0);
    });
    it("check basic", () => {
        check([]);
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
        check([1, 1, 1, 5, 5, 5]);
        check([5, 5, 5, 1, 1, 1]);
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