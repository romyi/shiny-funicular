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
exports.cards = void 0;
var crypto_1 = require("crypto");
exports.cards = [
    {
        id: '1',
        deck: 'door',
        type: 'creature',
        context: 'skirmish'
    },
    {
        id: '2',
        deck: 'treasure',
        type: 'tool',
        context: 'skirmish'
    }
];
;
;
var Core = /** @class */ (function () {
    function Core() {
        this.deck = [];
        balance['sword'].initMechanic(this);
        for (var i = 0; i < 8; i++) {
            var card = __assign({}, balance['sword']);
            delete card['initMechanic'];
            delete card['mechanics'];
            this.deck.push(__assign(__assign({}, card), { id: (0, crypto_1.randomUUID)() }));
        }
    }
    Core.prototype.play = function (name) {
        for (var _i = 0, _a = balance[name].mechanics; _i < _a.length; _i++) {
            var mechanic = _a[_i];
            mechanic.play();
        }
    };
    return Core;
}());
var Action = /** @class */ (function () {
    function Action(card, core) {
        this.card = card;
        this.core = core;
    }
    Action.prototype.play = function () { };
    return Action;
}());
var PrintType = /** @class */ (function (_super) {
    __extends(PrintType, _super);
    function PrintType(card, core) {
        return _super.call(this, card, core) || this;
    }
    PrintType.prototype.play = function () {
        console.log(this.card.type);
    };
    return PrintType;
}(Action));
var DealDamage = /** @class */ (function (_super) {
    __extends(DealDamage, _super);
    function DealDamage(card, core, hits) {
        var _this = _super.call(this, card, core) || this;
        _this.hits = hits;
        return _this;
    }
    DealDamage.prototype.play = function () {
        console.log("dealt ".concat(this.hits, " damage"));
    };
    return DealDamage;
}(Action));
var balance = {
    'sword': {
        name: 'sword',
        deck: 'treasure',
        type: 'equipment',
        context: 'free',
        mechanics: [],
        initMechanic: function (core) {
            this.mechanics.push(new PrintType(this, core));
            this.mechanics.push(new DealDamage(this, core, 4));
        }
    },
    'boobasaur': {
        name: 'boobasaur',
        deck: 'door',
        type: 'creature',
        context: 'free',
        mechanics: [],
        initMechanic: function (core) { this.mechanics.push(new PrintType(this, core)); }
    }
};
// balance['sword'].initMechanic();
// console.log(balance['sword'].mechanics[0].play())
var core = new Core();
console.log(core.play('sword'));
