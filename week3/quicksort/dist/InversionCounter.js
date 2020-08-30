"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InversionCounter = void 0;
class InversionCounter {
    static merge(l, r, c) {
        const out = [];
        let n = 0;
        let i = 0, j = 0;
        while (true) {
            if (i >= l.a.length || j >= r.a.length) {
                break;
            }
            else if (c.isLessThanOrEq(l.a[i], r.a[j])) {
                out.push(l.a[i]);
                i++;
            }
            else {
                out.push(r.a[j]);
                j++;
                n += l.a.length - i;
            }
        }
        while (i < l.a.length) {
            out.push(l.a[i]);
            i++;
        }
        while (j < r.a.length) {
            out.push(r.a[j]);
            j++;
        }
        return {
            a: out,
            n: l.n + r.n + n
        };
    }
    static sortAndCount(a, c) {
        const len = a.length;
        if (len <= 1) {
            return {
                a,
                n: 0
            };
        }
        else if (len === 2) {
            return c.isLessThanOrEq(a[0], a[1]) ? { a: [a[0], a[1]], n: 0 } : { a: [a[1], a[0]], n: 1 };
        }
        else {
            const nLeft = Math.floor(len / 2);
            const left = a.slice(0, nLeft), right = a.slice(nLeft);
            const leftSorted = InversionCounter.sortAndCount(left, c), rightSorted = InversionCounter.sortAndCount(right, c);
            return InversionCounter.merge(leftSorted, rightSorted, c);
        }
    }
}
exports.InversionCounter = InversionCounter;
//# sourceMappingURL=InversionCounter.js.map