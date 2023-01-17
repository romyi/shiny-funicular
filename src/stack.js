"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
var Stack = /** @class */ (function () {
    function Stack() {
        this.iter = 1;
        this.cards = [];
    }
    Stack.prototype.refresh = function () {
        this.iter++;
        this.cards = [];
        this.frames = [];
    };
    Stack.prototype.addCard = function (card) {
        var _a;
        if (card.context === 'skirmish') {
            (_a = this.frames) === null || _a === void 0 ? void 0 : _a.push(card.context);
        }
        this.cards.push(card);
    };
    return Stack;
}());
exports.Stack = Stack;
