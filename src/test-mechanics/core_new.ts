import { randomUUID } from "crypto";

const prompt = require('prompt-sync')();

interface Card {
    id: string
    name: string
}

interface ItemCard extends Card {
    id: string
    name: string
    stats: ItemStats
}

interface CreatureCard extends Card {
    id: string
    name: string
    stats: CreatureStats
}

interface CreatureStats {
    reward: number
    tier: number
}

interface ItemStats {
    cost: number
    effect: number
}

interface Blueprint {
    name: string
    starting_stats: CreatureStats | ItemStats
    play: (Core, card: Card | ItemCard, playerId: string) => void
}

type Lookup = Record<string, Blueprint>

class Player {
    id: string
    name: string
    hand: Card[] = []
    inventory: Card[] = []
    strength: number = 1
    constructor(name: string) {
        this.id = randomUUID();
        this.name = name;
    }
}

class GameCore {
    doors: Card[] = [];
    loots: Card[] = [];
    stash: Card[] = [];
    stage: string;
    players: Player[] = []
    lookup: Record<string, Blueprint>
    feedback: (message: string) => any
    constructor(table: Lookup) {
        this.stage = 'start'
        this.lookup = table
    }
    setFeedback(fn: (message: string) => any) {
        this.feedback = fn
    }
    act(card: Card, playerId: string) {
        this.lookup[card.name].play(this, card, playerId);
    }
}

const engine_v1: Lookup = {
    sword: {
        name: 'sword',
        starting_stats: {
            cost: 4,
            effect: 3
        },
        play(core: GameCore, card: any, playerId: string) {
            console.log(`played card with id ${card.id}`)
            core.setFeedback((message: string) => prompt(message));
            const la = core.feedback('draw dice: ');
            const player = core.players.find(player => player.id == playerId);
            if (player) {
                player.strength += card.stats.effect;
                player.hand.push(card)
            }
        },
    },
    mister: {
        name: 'mister',
        starting_stats: {
            reward: 2,
            tier: 4
        },
        play(core: GameCore, card: Card, playerId: string) {
            console.log(`played card with id ${card.id}`)
            core.stage = 'fight'
        }
    }
}

const swordcard: ItemCard = {
    id: '123',
    name: 'sword',
    stats: {...engine_v1['sword'].starting_stats} as ItemStats
}

const dima = new Player('Dima')
dima.hand.push(swordcard)

const game = new GameCore(engine_v1);
game.players.push(dima)
game.act(swordcard, dima.id);
console.log(game)


export {}