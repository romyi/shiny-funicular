import { Card } from "./card";

export class Stack {
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
    addCard(card: Card) {
        if (card.context === 'skirmish') {
            this.frames?.push(card.context)
        }
        this.cards.push(card);
    }
}