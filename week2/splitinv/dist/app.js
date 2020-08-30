"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InversionCounter_1 = require("./InversionCounter");
const fs = require('fs');
fs.readFile('input.txt', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    let input = data.split('\n').map(i => parseInt(i));
    //console.log(data);
    console.log(input[0]);
    console.log(input[1]);
    const ans = InversionCounter_1.InversionCounter.sortAndCount(input, comp);
    console.log(ans);
});
const comp = {
    isLessThanOrEq: (a, b) => {
        return a <= b;
    }
};
//# sourceMappingURL=app.js.map