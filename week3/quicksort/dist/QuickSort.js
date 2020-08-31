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
    static partition(a, c, l, r) {
        const pivot = a[l];
        let i = l + 1;
        let j = l + 1;
        while (j < r + 1) {
            const inspect = a[j];
            if (!c(inspect, pivot)) {
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
    static sort(a, c, l, r) {
        if (r - l === 0) {
            // already sorted;
        }
        else if (r - l === 1) {
            if (!c(a[l], a[r])) {
                swap(a, l, r);
            }
        }
        else {
            const pivotIndex = QuickSort.partition(a, c, l, r);
            if (pivotIndex > l) {
                QuickSort.sort(a, c, l, pivotIndex - 1);
            }
            if (pivotIndex < r) {
                QuickSort.sort(a, c, pivotIndex + 1, r);
            }
        }
    }
}
exports.QuickSort = QuickSort;
//# sourceMappingURL=QuickSort.js.map