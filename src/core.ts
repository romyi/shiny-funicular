import { randomUUID } from 'crypto';
import { Card, cards } from './card';
import { Player } from './player';
import { Stack } from './stack';
const prompt = require('prompt-sync')();


class Pool {
    games: Game[];
    constructor() {
        this.games = [];
    }
}

class Game {
    id: string
    name: string
    constructor(name: string) {
        this.name = name;
        this.id = randomUUID();
        pool.games.push(this);
    }
}

class Core {
    game: Game
    players: Player[]
    stack: Stack | undefined;
    constructor(game: Game, player: Player) {
        this.game = game;
        this.players = [];
        this.players.push(player);
    }
    pickCards() {
        let circles = 2;
        while (circles > 0) {
            for (let player of this.players) {
                const card = cards.pop()
                if (card) player.cards.push(card)
            }
            circles--;
        }
        
    }
    addCardToStack(casted: Card) {
        this.stack?.cards.push(casted);
    }
    popCardFromDeck() {
        const card = cards.pop();
        if (card) {
            console.log(`opened ${JSON.stringify(card, null, 2)}`);
            this.startStack(card);
        }
    }
    drawCardsFromStack() {
        this.stack?.refresh();
    }
    startStack(card: Card) {
        this.stack = new Stack();
        this.stack?.addCard(card);
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
const acard = alice.cast()
if (acard) core.addCardToStack(acard)
const bcard = boris.cast()
if (bcard) core.addCardToStack(bcard)

console.log(JSON.stringify(core, null, 2));
