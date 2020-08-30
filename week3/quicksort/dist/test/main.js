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
const QuickSort_1 = require("../QuickSort");
let expect = chai.expect;
const selectionIsSorted = (a, l, r) => {
    for (let i = l; i <= r - 1; i++) {
        if (a[i] > a[i + 1]) {
            return false;
        }
    }
    return true;
};
const isSorted = (a) => {
    return selectionIsSorted(a, 0, a.length - 1);
};
const allLessThan = (a, val) => {
    return a.filter(x => x < val).length === a.length;
};
const allGreaterThan = (a, val) => {
    return a.filter(x => x > val).length === a.length;
};
describe("description", () => {
    const checkPartition = (a) => {
        console.log('a', a);
        let numLessThanFirst = 0;
        for (let i = 1; i < a.length; i++) {
            if (a[i] < a[0]) {
                numLessThanFirst++;
            }
        }
        const p = QuickSort_1.QuickSort.partition(a, 0, a.length - 1);
        console.log('a par', a);
        console.log('p', p);
        console.log('numLessThanFirst', numLessThanFirst);
        expect(p).to.equal(numLessThanFirst);
        console.log('a0', a.slice(0, p));
        console.log('a1', a.slice(p + 1));
        expect(allLessThan(a.slice(0, p), a[p])).to.equal(true);
        expect(allGreaterThan(a.slice(p + 1), a[p])).to.equal(true);
    };
    it("partitions", () => {
        //checkPartition([9, 8, 2, 5, 1, 4, 7, 6]);
        //checkPartition([3, 8, 2, 10, 1, 4, 7, 6]);
        //checkPartition([8, 5, 2, 5, 1, 4, 9, 6]);
        checkPartition([4, 8, 2, 6, 1, 9, 7, 11]);
    });
});
//# sourceMappingURL=main.js.map