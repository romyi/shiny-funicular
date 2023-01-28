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
var crypto_1 = require("crypto");
var prompt = require('prompt-sync')();
var Player = /** @class */ (function () {
    function Player(name) {
        this.hand = [];
        this.inventory = [];
        this.strength = 1;
        this.id = (0, crypto_1.randomUUID)();
        this.name = name;
    }
    return Player;
}());
var GameCore = /** @class */ (function () {
    function GameCore(table) {
        this.doors = [];
        this.loots = [];
        this.stash = [];
        this.players = [];
        this.stage = 'start';
        this.lookup = table;
    }
    GameCore.prototype.setFeedback = function (fn) {
        this.feedback = fn;
    };
    GameCore.prototype.act = function (card, playerId) {
        this.lookup[card.name].play(this, card, playerId);
    };
    return GameCore;
}());
var engine_v1 = {
    sword: {
        name: 'sword',
        starting_stats: {
            cost: 4,
            effect: 3
        },
        play: function (core, card, playerId) {
            console.log("played card with id ".concat(card.id));
            core.setFeedback(function (message) { return prompt(message); });
            var la = core.feedback('draw dice: ');
            var player = core.players.find(function (player) { return player.id == playerId; });
            if (player) {
                player.strength += card.stats.effect;
                player.hand.push(card);
            }
        },
    },
    mister: {
        name: 'mister',
        starting_stats: {
            reward: 2,
            tier: 4
        },
        play: function (core, card, playerId) {
            console.log("played card with id ".concat(card.id));
            core.stage = 'fight';
        }
    }
};
var swordcard = {
    id: '123',
    name: 'sword',
    stats: __assign({}, engine_v1['sword'].starting_stats)
};
var dima = new Player('Dima');
dima.hand.push(swordcard);
var game = new GameCore(engine_v1);
game.players.push(dima);
game.act(swordcard, dima.id);
console.log(game);
