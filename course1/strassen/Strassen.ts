import {Matrix, clone, add, subtract, padSqr} from "./Matrix";

export type StrassenDecomposition = {
    topLeft:Matrix;
    topRight:Matrix;
    bottomLeft:Matrix;
    bottomRight:Matrix;
    augmented:boolean;
};

export class Strassen{
    static join(d:StrassenDecomposition):Matrix{
        const out:Matrix = [];
        const n = d.topLeft.length, m = d.topRight.length;
        for(let i = 0; i < n + m; i++){
            out[i] = [];
            for(let j = 0; j < n + m; j++){
                let submatrix:Matrix, _i:number, _j:number;
                if(i < n){
                    _i = i;
                    if(j < n){
                        submatrix = d.topLeft;
                        _j = j;
                    }
                    else{
                        submatrix = d.topRight;
                        _j = j - n;
                    }
                }
                else{
                    _i = i - n;
                    if(j < n){
                        submatrix = d.bottomLeft;
                        _j = j;
                    }
                    else{
                        submatrix = d.bottomRight;
                        _j = j - n;
                    }
                }
                out[i][j] = submatrix[_i][_j];
            }
        }
        return d.augmented ? clone(out, 0, out.length - 1, 0 , out.length - 1) : out;
    }
    static decompose (x:Matrix):StrassenDecomposition{
        const n = x.length;
        const first:number = Math.ceil(n/2);
        const second = n - first;
        const augmented = (n%2 === 1);
        const topLeft = clone(x, 0, first, 0, first);
        let topRight = clone(x, 0, first, first, second);
        let bottomLeft = clone(x, first, second, 0, first);
        let bottomRight = clone(x, first, second, first, second);
        if(augmented){
            topRight = padSqr(topRight, first);
            bottomLeft = padSqr(bottomLeft, first);
            bottomRight = padSqr(bottomRight, first);
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

    static multiply(x:Matrix, y:Matrix):Matrix{
        const n = x.length;
        if(n === 1){
            const entry:number = x[0][0] * y[0][0];
            return [[entry]];
        }
        else{
            const augmented = (n % 2 === 1);
            const decompositionX = Strassen.decompose(x)
            const decompositionY = Strassen.decompose(y);
            const a:Matrix = decompositionX.topLeft;
            const b:Matrix = decompositionX.topRight;
            const c:Matrix = decompositionX.bottomLeft;
            const d:Matrix = decompositionX.bottomRight;
            const e:Matrix = decompositionY.topLeft;
            const f:Matrix = decompositionY.topRight;
            const g:Matrix = decompositionY.bottomLeft;
            const h:Matrix = decompositionY.bottomRight;
            const p1:Matrix = Strassen.multiply(a, subtract(f, h));
            const p2:Matrix = Strassen.multiply(add(a, b), h);
            const p3:Matrix = Strassen.multiply(add(c, d), e);
            const p4:Matrix = Strassen.multiply(d, subtract(g, e));
            const p5:Matrix = Strassen.multiply(add(a, d), add(e, h));
            const p6:Matrix = Strassen.multiply(subtract(b, d), add(g, h));
            const p7:Matrix = Strassen.multiply(subtract(a, c), add(e, f));
            const topLeft = subtract(add(add(p4, p5), p6), p2);
            const topRight = add(p1, p2);
            const bottomLeft = add(p3, p4);
            const bottomRight = subtract(subtract(add(p1, p5), p3), p7);
            return Strassen.join({topLeft, topRight, bottomLeft, bottomRight, augmented});
        }
    }
}
