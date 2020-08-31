"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergeSort = void 0;
class MergeSort {
    static merge(l, r, c) {
        const out = [];
        let i = 0, j = 0;
        while (true) {
            if (i >= l.length || j >= r.length) {
                break;
            }
            else if (c(l[i], r[j])) {
                out.push(l[i]);
                i++;
            }
            else {
                out.push(r[j]);
                j++;
            }
        }
        while (i < l.length) {
            out.push(l[i]);
            i++;
        }
        while (j < r.length) {
            out.push(r[j]);
            j++;
        }
        return out;
    }
    static sort(a, c) {
        const len = a.length;
        if (len === 0) {
            return [];
        }
        else if (len === 1) {
            return a;
        }
        else if (len === 2) {
            return c(a[0], a[1]) ? a : [a[1], a[0]];
        }
        else {
            const nLeft = Math.floor(len / 2);
            const left = a.slice(0, nLeft), right = a.slice(nLeft);
            const leftSorted = MergeSort.sort(left, c), rightSorted = MergeSort.sort(right, c);
            return MergeSort.merge(leftSorted, rightSorted, c);
        }
    }
}
exports.MergeSort = MergeSort;
//# sourceMappingURL=MergeSort.js.map