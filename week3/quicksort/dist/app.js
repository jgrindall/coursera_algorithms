"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuickSort_1 = require("./QuickSort");
const comp = (a, b) => {
    return a <= b;
};
const ans = QuickSort_1.QuickSort.sort([1, 3, 2], comp, 0, 2);
console.log(ans);
//# sourceMappingURL=app.js.map