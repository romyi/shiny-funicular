"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Core = exports.Game = void 0;
var crypto_1 = require("crypto");
var card_new_1 = require("./card_new");
var prompt = require('prompt-sync')();
var Game = /** @class */ (function () {
    function Game(name) {
        this.name = name;
        this.id = (0, crypto_1.randomUUID)();
    }
    return Game;
}());
exports.Game = Game;
var Core = /** @class */ (function () {
    function Core(game, config) {
        var loots = [];
        var doors = [];
        for (var _i = 0, _a = Object.entries(config); _i < _a.length; _i++) {
            var _b = _a[_i], cardname = _b[0], q = _b[1];
            for (var index = 0; index < q; index++) {
                var card = __assign(__assign({}, card_new_1.cardlookup[cardname]), { id: (0, crypto_1.randomUUID)() });
                delete card.mechanics;
                if (card.type === 'creature' || card.type === 'race') {
                    doors.push(card);
                }
                else {
                    loots.push(card);
                }
            }
        }
        this.ask = function () { };
        this.phase = 'start';
        this.active = 0;
        this.game = game;
        this.players = [];
        this.stack = null;
        this.loots = loots;
        this.doors = doors;
        this.stash = [];
    }
    Core.prototype.bindask = function (fromsoket) {
        this.ask = fromsoket;
    };
    return Core;
}());
exports.Core = Core;
