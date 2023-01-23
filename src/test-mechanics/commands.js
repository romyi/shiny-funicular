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
var Modes = ['Exploration', 'Interception', 'Idle'];
var deckconfig = {
    kinggoblin: 1,
    goblin: 3,
    desireRing: 2
};
var GoDealDamage = /** @class */ (function () {
    function GoDealDamage(hits) {
        var _this = this;
        this.name = 'deal damage';
        this.stash = {};
        this.revert = function () { };
        this.reverted = false;
        this.take = function (core) {
            var name;
            if (!_this.stash.reciever) {
                name = prompt('who recieves damage');
            }
            else {
                name = _this.stash.reciever;
            }
            var player = core.players.find(function (player) { return player.name === name; });
            if (player) {
                player.hits -= hits;
                _this.revert = function () {
                    console.log(this.reverted);
                    if (this.reverted) {
                        player.hits -= hits;
                        core.log.push(__assign(__assign({}, this), { name: 'deal damage again', reverted: !this.reverted, stash: { reciever: name } }));
                    }
                    else {
                        player.hits += hits;
                        core.log.push(__assign(__assign({}, this), { name: 'cancel damage', reverted: !this.reverted, stash: { reciever: name } }));
                    }
                };
                core.log.push(__assign(__assign({}, _this), { name: 'deal damage', reverted: _this.reverted, stash: { reciever: name } }));
            }
            else {
                console.log('incorrect name. out');
            }
        };
    }
    return GoDealDamage;
}());
var cards = {
    kinggoblin: {
        name: 'king goblin',
        deck: 'tr',
        kind: 'mob',
        action: new GoDealDamage(10)
    },
    goblin: {
        name: 'goblin',
        deck: 'do',
        kind: 'mob',
        action: new GoDealDamage(4)
    },
    desireRing: {
        name: 'dring',
        deck: 'tr',
        kind: 'item',
        action: {
            reverted: false,
            name: 'revert',
            stash: {},
            revert: function () { },
            take: function (core) {
                if (core.log.length > 0) {
                    // console.log(core.log)
                    var effect = core.log.at(-1);
                    if (effect) {
                        // core.log.push({...this, name: `revert ${effect.name}`})
                        effect === null || effect === void 0 ? void 0 : effect.revert();
                    }
                }
                else {
                    console.log('nothing to deny');
                }
            },
        }
    }
};
var Deck = /** @class */ (function () {
    function Deck(deckConfig) {
        var _this = this;
        this.kart = [];
        console.log('a');
        Object.entries(deckConfig).forEach(function (entry) {
            for (var i = 0; i < entry[1]; i++) {
                _this.kart.push(__assign(__assign({}, cards[entry[0]]), { id: (0, crypto_1.randomUUID)() }));
            }
        });
        // for (let cardname of deckConfig) {
        //     for (let index = 0; index < deckConfig[cardname]; index++) {
        //         console.log(cardname)
        //     }
        // }
    }
    return Deck;
}());
var plA = {
    name: 'Rosh',
    hits: 10
};
var plB = {
    name: 'Jaden',
    hits: 11
};
var plC = {
    name: 'Tanette',
    hits: 12
};
var core = {
    players: [plA, plB, plC],
    phase: 'Interception',
    log: []
};
console.log(plA.hits);
cards.goblin.action.take(core);
cards.desireRing.action.take(core);
cards.desireRing.action.take(core);
cards.kinggoblin.action.take(core);
cards.desireRing.action.take(core);
console.log(core.log);
console.log(plA.hits);
