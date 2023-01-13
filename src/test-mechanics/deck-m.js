"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var deck_1 = require("./../deck");
var draw = new deck_1.Draw();
var treasures = new deck_1.Treasures(draw);
var a = treasures.take(3);
// const b = treasures.take(2);
console.log("AAA\n".concat(JSON.stringify(a, null, 3)));
console.log(JSON.stringify(treasures, null, 3));
draw.put(__spreadArray([], a, true));
a = [];
console.log("AAA\n".concat(JSON.stringify(a, null, 3)));
console.log(JSON.stringify(treasures, null, 3));
a = __spreadArray(__spreadArray([], a, true), treasures.take(2), true);
console.log("AAA\n".concat(JSON.stringify(a, null, 3)));
console.log(JSON.stringify(treasures, null, 3));
// draw.put([...a, ...b]);
// const c = treasures.take(6);
// console.log(`CCC\n${JSON.stringify(c, null, 3)}`)
