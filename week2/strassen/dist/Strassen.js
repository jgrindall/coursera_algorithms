"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strassen = void 0;
const Matrix_1 = require("./Matrix");
class Strassen {
    static join(d) {
        const out = [];
        const n = d.topLeft.length, m = d.topRight.length;
        for (let i = 0; i < n + m; i++) {
            out[i] = [];
            for (let j = 0; j < n + m; j++) {
                let submatrix, _i, _j;
                if (i < n) {
                    _i = i;
                    if (j < n) {
                        submatrix = d.topLeft;
                        _j = j;
                    }
                    else {
                        submatrix = d.topRight;
                        _j = j - n;
                    }
                }
                else {
                    _i = i - n;
                    if (j < n) {
                        submatrix = d.bottomLeft;
                        _j = j;
                    }
                    else {
                        submatrix = d.bottomRight;
                        _j = j - n;
                    }
                }
                out[i][j] = submatrix[_i][_j];
            }
        }
        return d.augmented ? Matrix_1.clone(out, 0, out.length - 1, 0, out.length - 1) : out;
    }
    static decompose(x) {
        const n = x.length;
        const first = Math.ceil(n / 2);
        const second = n - first;
        const augmented = (n % 2 === 1);
        const topLeft = Matrix_1.clone(x, 0, first, 0, first);
        let topRight = Matrix_1.clone(x, 0, first, first, second);
        let bottomLeft = Matrix_1.clone(x, first, second, 0, first);
        let bottomRight = Matrix_1.clone(x, first, second, first, second);
        if (augmented) {
            topRight = Matrix_1.padSqr(topRight, first);
            bottomLeft = Matrix_1.padSqr(bottomLeft, first);
            bottomRight = Matrix_1.padSqr(bottomRight, first);
            bottomRight[bottomRight.length - 1][bottomRight.length - 1] = 1;
        }
        return {
            topLeft,
            topRight,
            bottomLeft,
            bottomRight,
            augmented
        };
    }
    static multiply(x, y) {
        const n = x.length;
        if (n === 1) {
            const entry = x[0][0] * y[0][0];
            return [[entry]];
        }
        else {
            const augmented = (n % 2 === 1);
            const decompositionX = Strassen.decompose(x);
            const decompositionY = Strassen.decompose(y);
            const a = decompositionX.topLeft;
            const b = decompositionX.topRight;
            const c = decompositionX.bottomLeft;
            const d = decompositionX.bottomRight;
            const e = decompositionY.topLeft;
            const f = decompositionY.topRight;
            const g = decompositionY.bottomLeft;
            const h = decompositionY.bottomRight;
            const p1 = Strassen.multiply(a, Matrix_1.subtract(f, h));
            const p2 = Strassen.multiply(Matrix_1.add(a, b), h);
            const p3 = Strassen.multiply(Matrix_1.add(c, d), e);
            const p4 = Strassen.multiply(d, Matrix_1.subtract(g, e));
            const p5 = Strassen.multiply(Matrix_1.add(a, d), Matrix_1.add(e, h));
            const p6 = Strassen.multiply(Matrix_1.subtract(b, d), Matrix_1.add(g, h));
            const p7 = Strassen.multiply(Matrix_1.subtract(a, c), Matrix_1.add(e, f));
            const topLeft = Matrix_1.subtract(Matrix_1.add(Matrix_1.add(p4, p5), p6), p2);
            const topRight = Matrix_1.add(p1, p2);
            const bottomLeft = Matrix_1.add(p3, p4);
            const bottomRight = Matrix_1.subtract(Matrix_1.subtract(Matrix_1.add(p1, p5), p3), p7);
            return Strassen.join({ topLeft, topRight, bottomLeft, bottomRight, augmented });
        }
    }
}
exports.Strassen = Strassen;
//# sourceMappingURL=Strassen.js.map