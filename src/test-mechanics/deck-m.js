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
var doors = new deck_1.Doors(draw);
var a = __spreadArray(__spreadArray([], treasures.take(1), true), doors.take(2), true);
var b = __spreadArray(__spreadArray([], treasures.take(2), true), doors.take(1), true);
console.log("AAA\n".concat(JSON.stringify(a, null, 3)));
console.log("BBB\n".concat(JSON.stringify(b, null, 3)));
console.log(JSON.stringify(treasures, null, 3));
console.log(JSON.stringify(doors, null, 3));
draw.put(__spreadArray([], b, true));
b = [];
console.log(JSON.stringify(doors, null, 3));
console.log(JSON.stringify(treasures, null, 3));
