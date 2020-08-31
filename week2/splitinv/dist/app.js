"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InversionCounter_1 = require("./InversionCounter");
const fs = require('fs');
const comp = (a, b) => {
    return a <= b;
};
fs.readFile('input.txt', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    let input = data.split('\n').map(i => parseInt(i));
    const ans = InversionCounter_1.InversionCounter.sortAndCount(input, comp);
    console.log(ans);
});
//# sourceMappingURL=app.js.map