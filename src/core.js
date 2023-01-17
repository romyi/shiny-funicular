"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Core = exports.Game = void 0;
var crypto_1 = require("crypto");
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
    function Core(game) {
        this.game = game;
        this.players = [];
        this.stack = null;
    }
    return Core;
}());
exports.Core = Core;
