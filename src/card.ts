export type DeckType = 'door' | 'treasure'
type Type = 'equipment' | 'creature' | 'tool' | 'class' | 'race'
type Context = 'skirmish' | 'free'

export interface Card {
    id: string;
    deck: DeckType;
    type: Type;
    context: Context;
};

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