"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardlookup = exports.config = void 0;
var Damage = /** @class */ (function () {
    function Damage() {
        this.name = 'deal_damage';
        this.action = function (core) {
            core.ask();
            core.phase = 'skirmish';
        };
    }
    return Damage;
}());
var Kill = /** @class */ (function () {
    function Kill() {
        var _this = this;
        this.name = 'kill';
        this.action = function (core) {
            console.log(_this);
            core.ask();
        };
    }
    return Kill;
}());
exports.config = {
    sword: 2,
    boobasour: 1
};
exports.cardlookup = {
    'sword': {
        name: 'sword',
        type: 'item',
        mechanics: [new Damage()]
    },
    'boobasour': {
        name: 'boobasour',
        type: 'creature',
        mechanics: [new Kill()]
    }
};
