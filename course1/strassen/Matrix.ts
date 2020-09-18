export type Matrix = Array<Array<number>>;

type MatrixT = (x:Matrix, y:Matrix)=>Matrix;

const operate = (op:(a:number, b:number)=>number):MatrixT=>{
    const f:MatrixT = (x:Matrix, y:Matrix)=>{
        const out:Matrix = [];
        const n = x.length;
        for(let i = 0; i < n; i++){
            out[i] = [];
            for(let j = 0; j < n; j++){
                out[i][j] = op(x[i][j], y[i][j]);
            }
        }
        return out;
    };
    return f;
};

export const add:MatrixT = operate((a, b) => a + b);
export const subtract:MatrixT = operate((a, b) => a - b);

export const standardMult = (a:Matrix, b:Matrix):Matrix=>{
    const out:Matrix = [], n = a.length;
    for(let i = 0; i < n; i++){
        out[i] = [];
        for(let j = 0; j < n; j++){
            out[i][j] = 0;
            for(let k = 0; k < n; k++){
                out[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return out;
};


export const clone = (x:Matrix, i0:number, iLength:number, j0:number, jLength:number):Matrix=>{
    const out:Matrix = [];
    for(let i = 0; i < iLength; i++){
        out[i] = [];
        for(let j = 0; j < jLength; j++){
            out[i][j] = x[i + i0][j + j0];
        }
    }
    return out;
};

export const padSqr = (a:Matrix, len:number):Matrix=>{
    const out:Matrix = [];
    for(let i = 0; i < len; i++){
        out[i] = [];
        for(let j = 0; j < len; j++){
            if(typeof a[i] === 'undefined' || typeof a[i][j] === 'undefined'){
                out[i][j] = 0;
            }
            else{
                out[i][j] = a[i][j];
            }
        }
    }
    return out;
};
