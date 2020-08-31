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
const comp = (a, b) => {
    return a <= b;
};
const swap = (a, i, j) => {
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
};
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
const getArray = (n) => {
    const a = [];
    for (let i = 0; i < n; i++) {
        a.push(i);
    }
    for (let i = 0; i < 2 * n; i++) {
        let i0 = Math.floor(Math.random() * n);
        let j0 = Math.floor(Math.random() * n);
        if (i0 !== j0) {
            swap(a, i0, j0);
        }
    }
    return a;
};
describe("description", () => {
    const checkPartition = (a) => {
        let numLessThanFirst = 0;
        for (let i = 1; i < a.length; i++) {
            if (a[i] < a[0]) {
                numLessThanFirst++;
            }
        }
        const p = QuickSort_1.QuickSort.partition(a, comp, 0, a.length - 1);
        expect(p).to.equal(numLessThanFirst);
        expect(allLessThan(a.slice(0, p), a[p])).to.equal(true);
        expect(allGreaterThan(a.slice(p + 1), a[p])).to.equal(true);
    };
    it("partitions", () => {
        for (let n = 4; n < 20; n++) {
            checkPartition(getArray(n));
        }
    });
    it("sorts", () => {
        for (let n = 4; n < 200; n++) {
            const a = getArray(n);
            const len = a.length;
            QuickSort_1.QuickSort.sort(a, comp, 0, a.length - 1);
            expect(len).to.equal(a.length);
            expect(isSorted(a)).to.equal(true);
        }
    });
});
//# sourceMappingURL=main.js.map