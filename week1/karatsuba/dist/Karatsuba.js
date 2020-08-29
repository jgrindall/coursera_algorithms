"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Karatsuba = void 0;
const getPowerTenCached = (() => {
    const cache = {};
    return n => {
        if (!cache[n]) {
            let s = "1";
            for (let i = 0; i < n; i++) {
                s += "0";
            }
            cache[n] = BigInt(s);
        }
        return cache[n];
    };
})();
class Karatsuba {
    static multiply(a, b) {
        let na = a.length, nb = b.length;
        if (na <= 1 && nb <= 1) {
            // single digits
            return String(parseInt(a, 10) * parseInt(b, 10));
        }
        while (na < nb) {
            a = '0' + a;
            na++;
        }
        while (nb < na) {
            b = '0' + b;
            nb++;
        }
        // equal length, padded with zeros at the front
        const m = Math.floor(na / 2);
        /*
            Split into  .....<m digits, called high>.....      ...... <na - m digits, called low>......
            This is 10^(na-m) high + low
        */
        const aHigh = a.substr(0, m) || '0';
        const aLow = a.substr(m) || '0';
        const bHigh = b.substr(0, m) || '0';
        const bLow = b.substr(m) || '0';
        const z2 = Karatsuba.multiply(aHigh, bHigh);
        const z0 = Karatsuba.multiply(aLow, bLow);
        const sumA = String(BigInt(aLow) + BigInt(aHigh));
        const sumB = String(BigInt(bLow) + BigInt(bHigh));
        const z1 = BigInt(Karatsuba.multiply(sumA, sumB)) - BigInt(z2) - BigInt(z0);
        const powerTen2 = getPowerTenCached(2 * (na - m));
        const powerTen = getPowerTenCached(na - m);
        const ans = (BigInt(z2) * powerTen2) + (z1 * powerTen) + BigInt(z0);
        return String(ans);
    }
}
exports.Karatsuba = Karatsuba;
//# sourceMappingURL=Karatsuba.js.map