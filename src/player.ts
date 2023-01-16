import { randomUUID } from 'crypto';
import { Card } from './card';

export class Player {
    id: string
    name: string
    hand: Card[]
    constructor(name: string) {
        this.id = randomUUID();
        this.name = name;
        this.hand = []
    }
    inHand(cards: Card[]) {
        this.hand = [...this.hand, ...cards]
    }
}