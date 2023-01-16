"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const crypto_1 = require("crypto");
class Player {
    constructor(name) {
        this.id = (0, crypto_1.randomUUID)();
        this.name = name;
        this.hand = [];
    }
    inHand(cards) {
        this.hand = [...this.hand, ...cards];
    }
}
exports.Player = Player;
