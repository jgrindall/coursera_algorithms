"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MergeSort_1 = require("./MergeSort");
const comp = {
    isLessThan: (a, b) => {
        return a < b;
    }
};
const ans = MergeSort_1.MergeSort.sort([5, 7, 3, 8, 9, 5, 7, 3, 2, 4, 6, 8, 6, 4, 8, 1], comp);
console.log(ans);
//# sourceMappingURL=app.js.map