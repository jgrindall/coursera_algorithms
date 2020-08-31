"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClosestPoints = exports.MergeSort = void 0;
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
const coordComp = (i) => {
    return (p, q) => {
        return p[i] <= q[i];
    };
};
const xComp = coordComp(0);
const yComp = coordComp(1);
const avg = (pts, coord) => {
    let sum = 0;
    for (let i = 0; i < pts.length; i++) {
        sum += pts[i][coord];
    }
    return sum / pts.length;
};
const dist = (p, q) => {
    const dx = p[0] - q[0];
    const dy = p[1] - q[1];
    return Math.sqrt(dx * dx + dy * dy);
};
class ClosestPoints {
    static getClosest(a) {
        const px = MergeSort.sort(a, xComp);
        const py = MergeSort.sort(a, yComp);
        return ClosestPoints.rcp(px, py);
    }
    static bruteForce(p) {
        let minDist = Infinity;
        let bestI = null, bestJ = null;
        for (let i = 0; i < p.length - 1; i++) {
            for (let j = i + 1; j < p.length; j++) {
                const d = dist(p[i], p[j]);
                if (d < minDist) {
                    bestI = p[i];
                    bestJ = p[j];
                    minDist = d;
                }
            }
        }
        return [bestI, bestJ];
    }
    static rcp(px, py) {
        const num = px.length;
        if (num <= 3) {
            return ClosestPoints.bruteForce(px);
        }
        const numLeft = Math.ceil(num / 2);
        const lx = px.slice(0, numLeft);
        const rx = px.slice(numLeft);
        const xbar = avg([lx[lx.length - 1], rx[0]], 0);
        const ly = py.filter(p => lx.includes(p));
        const ry = py.filter(p => rx.includes(p));
        const closestLeft = ClosestPoints.rcp(lx, ly);
        const closestRight = ClosestPoints.rcp(rx, ry);
        const distLeft = dist(closestLeft[0], closestLeft[1]);
        const distRight = dist(closestRight[0], closestRight[1]);
        const delta = Math.min(distLeft, distRight);
        const b = py.filter(p => Math.abs(p[0] - xbar) < delta);
        let minDist = Infinity;
        let bestBI = null, bestBJ = null;
        for (let i = 0; i < b.length - 1; i++) {
            for (let offset = 1; offset <= 7; offset++) {
                let j = i + offset;
                if (b[i] && b[j]) {
                    const d = dist(b[i], b[j]);
                    if (d < minDist) {
                        bestBI = b[i];
                        bestBJ = b[j];
                        minDist = d;
                    }
                }
            }
        }
        if (minDist < delta) {
            return [bestBI, bestBJ];
        }
        else if (distLeft < distRight) {
            return closestLeft;
        }
        else {
            return closestRight;
        }
    }
}
exports.ClosestPoints = ClosestPoints;
//# sourceMappingURL=ClosestPoints.js.map