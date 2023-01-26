import { randomUUID } from "crypto";

export type DeckType = 'door' | 'treasure'
type Type = 'equipment' | 'creature' | 'tool' | 'class' | 'race'
type Context = 'skirmish' | 'free'

export const cards: Card[] = [
    {
        id: '1',
        deck: 'door',
        type: 'creature',
        context: 'skirmish'
    },
    {
        id: '2',
        deck: 'treasure',
        type: 'tool',
        context: 'skirmish'
    }
]

export interface Card {
    id: string;
    deck: DeckType;
    type: Type;
    context: Context;
};

export interface Card2 extends Card {
    name: string;
}

export interface CardRecord {
    name: string
    deck: DeckType;
    type: Type;
    context: Context;
    initMechanic: Function
};

class Core {
    deck: Card2[] = [];
    constructor() {
        balance['sword'].initMechanic(this);
        for (let i = 0; i < 8; i++) {
            const card: any = {...balance['sword']};
            delete card['initMechanic'];
            delete card['mechanics']
            this.deck.push({
                ...card,
                id: randomUUID()
            })
        }
    }
    play(name: string) {
        for (const mechanic of balance[name].mechanics) {
            mechanic.play()
        }
    }
}

abstract class Action {
    card: CardRecord
    core: Core
    constructor(card: CardRecord, core: Core) {
        this.card = card;
        this.core = core;
    }
    play() {}
}

class PrintType extends Action {
    constructor(card: CardRecord, core: Core) {
        super(card, core)
    }
    play() {
        console.log(this.card.type)
    }
}

class DealDamage extends Action {
    hits: number
    constructor(card: CardRecord, core: Core, hits: number) {
        super(card, core)
        this.hits = hits
    }
    play() {
        console.log(`dealt ${this.hits} damage`)
    }
}

const balance: Record<string, CardRecord & {mechanics: Action[]}> = {
    'sword': {
        name: 'sword',
        deck: 'treasure',
        type: 'equipment',
        context: 'free',
        mechanics: [],
        initMechanic(core: Core) {
            this.mechanics.push(new PrintType(this, core));
            this.mechanics.push(new DealDamage(this, core, 4))
        }
    },
    'boobasaur': {
        name: 'boobasaur',
        deck: 'door',
        type: 'creature',
        context: 'free',
        mechanics: [],
        initMechanic(core: Core) { this.mechanics.push(new PrintType(this, core)) }
    }
}

// balance['sword'].initMechanic();
// console.log(balance['sword'].mechanics[0].play())

const core = new Core();
console.log(core.play('sword'))