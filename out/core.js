"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const card_1 = require("./card");
const player_1 = require("./player");
const stack_1 = require("./stack");
const prompt = require('prompt-sync')();
class Pool {
    constructor() {
        this.games = [];
    }
}
class Game {
    constructor(name) {
        this.name = name;
        this.id = (0, crypto_1.randomUUID)();
        pool.games.push(this);
    }
}
class Core {
    constructor(game, player) {
        this.game = game;
        this.players = [];
        this.players.push(player);
    }
    pickCards() {
        let circles = 2;
        while (circles > 0) {
            for (let player of this.players) {
                const card = card_1.cards.pop();
                if (card)
                    player.cards.push(card);
            }
            circles--;
        }
    }
    addCardToStack(casted) {
        var _a;
        (_a = this.stack) === null || _a === void 0 ? void 0 : _a.cards.push(casted);
    }
    popCardFromDeck() {
        const card = card_1.cards.pop();
        if (card) {
            console.log(`opened ${JSON.stringify(card, null, 2)}`);
            this.startStack(card);
        }
    }
    drawCardsFromStack() {
        var _a;
        (_a = this.stack) === null || _a === void 0 ? void 0 : _a.refresh();
    }
    startStack(card) {
        var _a;
        this.stack = new stack_1.Stack();
        (_a = this.stack) === null || _a === void 0 ? void 0 : _a.addCard(card);
    }
}
const pool = new Pool();
const alice = new player_1.Player("AAA BBB");
const thomas = new player_1.Player("UUU RRR");
const boris = new player_1.Player("XXX ZZZ");
const game = new Game('game AA BB');
const core = new Core(game, alice);
core.players.push(thomas);
core.players.push(boris);
core.pickCards();
const acard = alice.cast();
if (acard)
    core.addCardToStack(acard);
const bcard = boris.cast();
if (bcard)
    core.addCardToStack(bcard);
console.log(JSON.stringify(core, null, 2));
