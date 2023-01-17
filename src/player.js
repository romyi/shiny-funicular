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
exports.Player = void 0;
var crypto_1 = require("crypto");
var Player = /** @class */ (function () {
    function Player(name) {
        this.id = (0, crypto_1.randomUUID)();
        this.name = name;
        this.hand = [];
    }
    Player.prototype.inHand = function (cards) {
        this.hand = __spreadArray(__spreadArray([], this.hand, true), cards, true);
    };
    return Player;
}());
exports.Player = Player;
