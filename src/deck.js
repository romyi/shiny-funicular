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
exports.Doors = exports.Treasures = exports.Draw = void 0;
var card_1 = require("./card");
var Draw = /** @class */ (function () {
    function Draw() {
        this.cards = [];
    }
    Draw.prototype.put = function (outs) {
        this.cards = __spreadArray(__spreadArray([], outs, true), this.cards, true);
    };
    return Draw;
}());
exports.Draw = Draw;
var Treasures = /** @class */ (function () {
    function Treasures(draw) {
        var _this = this;
        this.type = 'treasure';
        this.cards = __spreadArray([], card_1.cards.filter(function (card) { return card.deck === _this.type; }), true);
        this.stash = draw;
    }
    Object.defineProperty(Treasures.prototype, "length", {
        get: function () {
            return this.cards.length;
        },
        enumerable: false,
        configurable: true
    });
    Treasures.prototype.take = function (amount) {
        var arr = [];
        for (var i = 0; i < amount; i++) {
            console.log("draw ".concat(i + 1, " card, total: ").concat(this.length));
            if (this.length === 0) {
                this.refresh();
            }
            var popped = this.cards.pop();
            arr.push(popped);
        }
        return arr;
    };
    Treasures.prototype.refresh = function () {
        var _this = this;
        console.log('treasure deck refreshes');
        this.cards = this.stash.cards.filter(function (card) { return card.deck === _this.type; });
        this.stash.cards = this.stash.cards.filter(function (card) { return card.deck !== _this.type; });
    };
    return Treasures;
}());
exports.Treasures = Treasures;
var Doors = /** @class */ (function () {
    function Doors(draw) {
        var _this = this;
        this.type = 'door';
        this.cards = __spreadArray([], card_1.cards.filter(function (card) { return card.deck === _this.type; }), true);
        this.stash = draw;
    }
    Object.defineProperty(Doors.prototype, "length", {
        get: function () {
            return this.cards.length;
        },
        enumerable: false,
        configurable: true
    });
    Doors.prototype.take = function (amount) {
        var arr = [];
        for (var i = 0; i < amount; i++) {
            console.log("draw ".concat(i + 1, " card, total: ").concat(this.length));
            if (this.length === 0) {
                this.refresh();
            }
            var popped = this.cards.pop();
            arr.push(popped);
        }
        return arr;
    };
    Doors.prototype.refresh = function () {
        var _this = this;
        console.log('treasure deck refreshes');
        this.cards = this.stash.cards.filter(function (card) { return card.deck === _this.type; });
        this.stash.cards = this.stash.cards.filter(function (card) { return card.deck !== _this.type; });
    };
    return Doors;
}());
exports.Doors = Doors;
