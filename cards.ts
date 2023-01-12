import { randomUUID } from 'crypto';
import { cards } from './core';
const prompt = require('prompt-sync')();

type Deck = 'door' | 'treasure'

export interface Card {
    id: string;
    rank: number;
    deck: Deck;
    name: string;
};

class Pool {
    games: Game[];
    constructor() {
        this.games = [];
    }
}

class Player {
    id: string
    name: string
    cards: Card[]
    constructor(name: string) {
        this.id = randomUUID();
        this.name = name;
        this.cards = []
    }
    cast(): Card | null {
        if (this.cards.length === 0) return null;
        console.log(`cards: ${JSON.stringify(this.cards, null, 2)}`);
        let prompted = prompt('cast a card: ');
        let casted = this.cards.find(card => card.id === prompted);
        if (casted) {
            let filtered = this.cards.filter(card => card.id !== casted?.id);
            this.cards = [...filtered];
            console.log(`card ${casted?.name} casted`);
            return casted;
        } else {
            return null;
        }
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

class Stack {
    iter: number
    cards: Card[]
    frames?: Array<'skirmish'> 
    constructor() {
        this.iter = 1;
        this.cards = []
    }
    refresh() {
        this.iter++;
        this.cards = []
        this.frames = []
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
    drawCardsFromStack() {
        this.stack?.refresh();
    }
    startStack() {
        this.stack = new Stack();
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
core.startStack();
const acard = alice.cast()
if (acard) core.addCardToStack(acard)
const bcard = boris.cast()
if (bcard) core.addCardToStack(bcard)

console.log(JSON.stringify(core, null, 2));
