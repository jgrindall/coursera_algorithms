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
const ClosestPoints_1 = require("../ClosestPoints");
let expect = chai.expect;
describe("description", () => {
    it("check", () => {
        const a = [];
        const num = 100;
        for (let i = 0; i < num; i++) {
            const p = [Math.random(), Math.random()];
            a.push(p);
        }
        const bruteForce = ClosestPoints_1.ClosestPoints.bruteForce(a);
        const ans = ClosestPoints_1.ClosestPoints.getClosest(a);
        expect(ans[0][0]).to.equal(bruteForce[0][0]);
        expect(ans[0][1]).to.equal(bruteForce[0][1]);
        expect(ans[1][0]).to.equal(bruteForce[1][0]);
        expect(ans[1][1]).to.equal(bruteForce[1][0]);
    });
});
//# sourceMappingURL=main.js.map