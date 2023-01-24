import { randomUUID } from 'crypto';
import { cardlookup, Card, Cardlookup } from './card_new';
import { Player } from './player';
import { Stack } from './stack';
const prompt = require('prompt-sync')();



export class Game {
    id: string
    name: string
    constructor(name: string) {
        this.name = name;
        this.id = randomUUID();
    }
}

export class Core {
    game: Game
    phase: 'start' | 'pick public' | 'pick private' | 'skirmish'
    active: number
    players: Player[]
    stack: Stack | null;
    stash: Card[];
    doors: Card[];
    loots: Card[];
    ask: () => void
    constructor(game: Game, config: Record<string, number>) {
        const loots = [];
        const doors = [];
        for (let [cardname, q] of Object.entries(config)) {
            for (let index = 0; index < q; index++) {
                const card: (Partial<Cardlookup> & {id: string}) = {...cardlookup[cardname], id: randomUUID()}
                delete card.mechanics
                if (card.type === 'creature' || card.type === 'race') {
                    doors.push(card as Card);
                } else {
                    loots.push(card as Card);
                }
            }
        }
        this.ask = () => {}
        this.phase = 'start'
        this.active = 0
        this.game = game;
        this.players = [];
        this.stack = null;
        this.loots = loots;
        this.doors = doors;
        this.stash = [];
    }
    bindask(fromsoket: () => void) {
        this.ask = fromsoket
    }
}
