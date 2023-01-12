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
exports.__esModule = true;
var crypto_1 = require("crypto");
var core_1 = require("./core");
var prompt = require('prompt-sync')();
;
var Pool = /** @class */ (function () {
    function Pool() {
        this.games = [];
    }
    return Pool;
}());
var Player = /** @class */ (function () {
    function Player(name) {
        this.id = (0, crypto_1.randomUUID)();
        this.name = name;
        this.cards = [];
    }
    Player.prototype.cast = function () {
        if (this.cards.length === 0)
            return null;
        console.log("cards: ".concat(JSON.stringify(this.cards, null, 2)));
        var prompted = prompt('cast a card: ');
        var casted = this.cards.find(function (card) { return card.id === prompted; });
        if (casted) {
            var filtered = this.cards.filter(function (card) { return card.id !== (casted === null || casted === void 0 ? void 0 : casted.id); });
            this.cards = __spreadArray([], filtered, true);
            console.log("card ".concat(casted === null || casted === void 0 ? void 0 : casted.name, " casted"));
            return casted;
        }
        else {
            return null;
        }
    };
    return Player;
}());
var Game = /** @class */ (function () {
    function Game(name) {
        this.name = name;
        this.id = (0, crypto_1.randomUUID)();
        pool.games.push(this);
    }
    return Game;
}());
var Stack = /** @class */ (function () {
    function Stack() {
        this.iter = 1;
        this.cards = [];
    }
    Stack.prototype.refresh = function () {
        this.iter++;
        this.cards = [];
    };
    return Stack;
}());
var Core = /** @class */ (function () {
    function Core(game, player) {
        this.game = game;
        this.players = [];
        this.players.push(player);
    }
    Core.prototype.pickCards = function () {
        var circles = 2;
        while (circles > 0) {
            for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
                var player = _a[_i];
                var card = core_1.cards.pop();
                if (card)
                    player.cards.push(card);
            }
            circles--;
        }
    };
    Core.prototype.addCardToStack = function (casted) {
        var _a;
        (_a = this.stack) === null || _a === void 0 ? void 0 : _a.cards.push(casted);
    };
    Core.prototype.drawCardsFromStack = function () {
        var _a;
        (_a = this.stack) === null || _a === void 0 ? void 0 : _a.refresh();
    };
    Core.prototype.startStack = function () {
        this.stack = new Stack();
    };
    return Core;
}());
var pool = new Pool();
var alice = new Player("AAA BBB");
var thomas = new Player("UUU RRR");
var boris = new Player("XXX ZZZ");
var game = new Game('game AA BB');
var core = new Core(game, alice);
core.players.push(thomas);
core.players.push(boris);
core.pickCards();
core.startStack();
var acard = alice.cast();
if (acard)
    core.addCardToStack(acard);
var bcard = boris.cast();
if (bcard)
    core.addCardToStack(bcard);
console.log(JSON.stringify(core, null, 2));
