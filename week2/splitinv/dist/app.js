"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InversionCounter_1 = require("./InversionCounter");
const comp = {
    isLessThanOrEq: (a, b) => {
        return a <= b;
    }
};
const ans = InversionCounter_1.InversionCounter.sortAndCount([5, 7, 3, 8, 9, 5, 7, 3, 2, 4, 6, 8, 6, 4, 8, 1], comp);
console.log(ans);
//# sourceMappingURL=app.js.map