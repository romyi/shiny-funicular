"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardlookup = exports.config = void 0;
var Damage = /** @class */ (function () {
    function Damage() {
        this.name = 'deal_damage';
        this.action = function (core) {
            core.ask({ script: 'highlight' });
        };
    }
    return Damage;
}());
var PhaseSwitch = /** @class */ (function () {
    function PhaseSwitch() {
        this.name = 'phase_switch';
        this.action = function (core) {
            core.phase = 'skirmish';
        };
    }
    return PhaseSwitch;
}());
var Kill = /** @class */ (function () {
    function Kill() {
        var _this = this;
        this.name = 'kill';
        this.action = function (core) {
            console.log(_this);
            core.ask({ script: 'yo' });
        };
    }
    return Kill;
}());
var switchToSkirmish = new PhaseSwitch();
var dealDamage = new Damage();
exports.config = {
    sword: 5,
    boobasour: 5
};
exports.cardlookup = {
    'sword': {
        name: 'sword',
        type: 'item',
        mechanics: [dealDamage],
        description: 'aa',
        price: 100
    },
    'boobasour': {
        name: 'boobasour',
        type: 'creature',
        mechanics: [switchToSkirmish],
        tier: 3,
        reward: 1,
        description: 'aa'
    }
};
