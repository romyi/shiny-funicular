import { randomUUID } from 'crypto';
import { Card } from './card';

export class Player {
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