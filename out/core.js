"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const card_1 = require("./card");
const prompt = require('prompt-sync')();
class Pool {
    constructor() {
        this.games = [];
    }
}
class Player {
    constructor(name) {
        this.id = (0, crypto_1.randomUUID)();
        this.name = name;
        this.cards = [];
    }
    cast() {
        if (this.cards.length === 0)
            return null;
        console.log(`cards: ${JSON.stringify(this.cards, null, 2)}`);
        let prompted = prompt('cast a card: ');
        let casted = this.cards.find(card => card.id === prompted);
        if (casted) {
            let filtered = this.cards.filter(card => card.id !== (casted === null || casted === void 0 ? void 0 : casted.id));
            this.cards = [...filtered];
            console.log(`card ${casted === null || casted === void 0 ? void 0 : casted.name} casted`);
            return casted;
        }
        else {
            return null;
        }
    }
}
class Game {
    constructor(name) {
        this.name = name;
        this.id = (0, crypto_1.randomUUID)();
        pool.games.push(this);
    }
}
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
        this.stack = new Stack();
        (_a = this.stack) === null || _a === void 0 ? void 0 : _a.addCard(card);
    }
}
const pool = new Pool();
const alice = new Player("AAA BBB");
const thomas = new Player("UUU RRR");
const boris = new Player("XXX ZZZ");
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
