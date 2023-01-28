"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var shuffleDeck = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};
var Player = /** @class */ (function () {
    function Player() {
    }
    return Player;
}());
var Core = /** @class */ (function () {
    function Core() {
        this.players = [];
        this.deck = [];
        this.stage = 'A';
    }
    Core.prototype.generateCards = function (deckconfig, lookup) {
        for (var _i = 0, _a = Object.entries(deckconfig); _i < _a.length; _i++) {
            var _b = _a[_i], name_1 = _b[0], q = _b[1];
            var settings = lookup[name_1];
            console.log(settings);
            if (settings.type === 'item') {
                for (var i = 0; i < q; i++) {
                    var card = new ItemCard(settings.name, settings.play, settings.config);
                    this.deck.push(card);
                }
            }
            if (settings.type === 'creature') {
                for (var i = 0; i < q; i++) {
                    var card = new CreatureCard(settings.name, settings.play, settings.config);
                    this.deck.push(card);
                }
            }
        }
    };
    Core.prototype.shuffle = function () {
        shuffleDeck(this.deck);
    };
    Core.prototype.act = function (card, id) {
        card.play(this, id);
    };
    return Core;
}());
var Card = /** @class */ (function () {
    function Card(name, play) {
        this.name = name;
        this.id = (0, crypto_1.randomUUID)();
        this.play = play;
    }
    return Card;
}());
var ItemCard = /** @class */ (function (_super) {
    __extends(ItemCard, _super);
    function ItemCard(name, play, itemconfig) {
        var _this = _super.call(this, name, play) || this;
        _this.config = itemconfig;
        return _this;
    }
    return ItemCard;
}(Card));
var CreatureCard = /** @class */ (function (_super) {
    __extends(CreatureCard, _super);
    function CreatureCard(name, play, creaturecinfig) {
        var _this = _super.call(this, name, play) || this;
        _this.config = creaturecinfig;
        return _this;
    }
    return CreatureCard;
}(Card));
var table = {
    'tool of fame': {
        type: 'item',
        name: 'tool of fame',
        config: {
            cost: 4
        },
        play: function (core, id) {
            console.log(id, core.players);
            if (core.players[0].hand[0].type === 'item')
                core.players[0].hand[0].config.cost;
        }
    },
    'chel': {
        type: 'creature',
        name: 'chel',
        config: {
            tier: 1
        },
        play: function (core, id) {
            console.log(id, core.stage);
        }
    }
};
var deck = {
    'tool of fame': 5,
    'chel': 5
};
var game = new Core();
game.generateCards(deck, table);
game.shuffle();
console.log(game.deck);
