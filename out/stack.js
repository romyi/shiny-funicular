"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class Stack {
    constructor() {
        this.iter = 1;
        this.cards = [];
    }
    refresh() {
        this.iter++;
        this.cards = [];
        this.frames = [];
    }
    addCard(card) {
        var _a;
        if (card.context === 'skirmish') {
            (_a = this.frames) === null || _a === void 0 ? void 0 : _a.push(card.context);
        }
        this.cards.push(card);
    }
}
exports.Stack = Stack;
