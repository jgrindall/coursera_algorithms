"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickSort = void 0;
const swap = (a, i, j) => {
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
};
class QuickSort {
    /**
      partition in place
    **/
    static partition(a, l, r) {
        const pivot = a[l];
        let i = l + 1;
        let j = l + 1;
        while (j < r + 1) {
            const inspect = a[j];
            if (inspect > pivot) {
                j++;
            }
            else {
                swap(a, i, j);
                i++;
                j++;
            }
        }
        swap(a, l, i - 1);
        return i - 1;
    }
    /**
      sort in place
    **/
    static sort(a, l, r) {
        // sort in place
        if (r - l === 0) {
            // already sorted;
        }
        else if (r - l === 1) {
            if (a[l] > a[r]) {
                swap(a, l, r);
            }
        }
        else {
            const pivotIndex = QuickSort.partition(a, l, r);
            QuickSort.sort(a, l, pivotIndex - 1);
            QuickSort.sort(a, pivotIndex + 1, r);
        }
    }
}
exports.QuickSort = QuickSort;
//# sourceMappingURL=QuickSort.js.map