import { Card, DeckType, cards } from "./card";

interface Deck {
    cards: Card[];
    get length (): number;
    take (amount: number): Card[];
    refresh (): void;
    stash: CommonStash;
}

interface CommonStash {
    cards: Card[];
    put (cards: Card[]): void;
}

const draw: Card[] = [
    {
        type: 'equipment',
        name: 'equipmentA',
        rank: 2,
        id: '8',
        deck: 'treasure',
        context: 'free'
    },
    {
        type: 'tool',
        name: 'toolB',
        rank: 15,
        id: '9',
        deck: 'treasure',
        context: 'skirmish'
    },
    {
        type: 'tool',
        name: 'toolC',
        rank: 6,
        id: '10',
        deck: 'treasure',
        context: 'skirmish'
    }
];

export class Draw implements CommonStash {
    cards: Card[]
    constructor() {
        this.cards = []
    }
    put(outs: Card[]): void {
        this.cards = [...outs, ...this.cards]
    }
}

export class Treasures implements Deck {
    cards: Card[];
    type: DeckType = 'treasure'
    stash: CommonStash
    constructor(draw: CommonStash) {
        this.cards = [...cards.filter((card) => card.deck === this.type)]
        this.stash = draw;
    }
    get length(): number {
        return this.cards.length
    }
    take(amount: number): Card[] {
        let arr: Card[] = [];
        for (let i: number = 0; i < amount; i++) {
            console.log(`draw ${i + 1} card, total: ${this.length}`);
            if (this.length === 0) {
                this.refresh()
            }
            const popped = this.cards.pop() as Card;
            arr.push(popped);
        }
        return arr;
    }
    refresh() {
        console.log('treasure deck refreshes');
        this.cards = this.stash.cards.filter((card) => card.deck === this.type);
        this.stash.cards = [];
    }
}

