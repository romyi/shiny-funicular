import { randomUUID } from 'crypto';
import { Card, cards } from './card';
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
    players: Player[]
    stack: Stack | null;
    constructor(game: Game) {
        this.game = game;
        this.players = [];
        this.stack = null;
    }
}
