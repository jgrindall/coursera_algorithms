"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padSqr = exports.clone = exports.standardMult = exports.subtract = exports.add = void 0;
const operate = (op) => {
    const f = (x, y) => {
        const out = [];
        const n = x.length;
        for (let i = 0; i < n; i++) {
            out[i] = [];
            for (let j = 0; j < n; j++) {
                out[i][j] = op(x[i][j], y[i][j]);
            }
        }
        return out;
    };
    return f;
};
exports.add = operate((a, b) => a + b);
exports.subtract = operate((a, b) => a - b);
exports.standardMult = (a, b) => {
    const out = [], n = a.length;
    for (let i = 0; i < n; i++) {
        out[i] = [];
        for (let j = 0; j < n; j++) {
            out[i][j] = 0;
            for (let k = 0; k < n; k++) {
                out[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return out;
};
exports.clone = (x, i0, iLength, j0, jLength) => {
    const out = [];
    for (let i = 0; i < iLength; i++) {
        out[i] = [];
        for (let j = 0; j < jLength; j++) {
            out[i][j] = x[i + i0][j + j0];
        }
    }
    return out;
};
exports.padSqr = (a, len) => {
    const out = [];
    for (let i = 0; i < len; i++) {
        out[i] = [];
        for (let j = 0; j < len; j++) {
            if (typeof a[i] === 'undefined' || typeof a[i][j] === 'undefined') {
                out[i][j] = 0;
            }
            else {
                out[i][j] = a[i][j];
            }
        }
    }
    return out;
};
//# sourceMappingURL=Matrix.js.map