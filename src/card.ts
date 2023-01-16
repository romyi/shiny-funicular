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
    },
    {
        id: '3',
        deck: 'door',
        type: 'creature',
        context: 'skirmish'
    },
    {
        id: '4',
        deck: 'door',
        type: 'creature',
        context: 'skirmish'
    },
    {
        id: '5',
        deck: 'treasure',
        type: 'equipment',
        context: 'free'
    },
    {
        id: '6',
        deck: 'treasure',
        type: 'equipment',
        context: 'free'
    },
    {
        id: '7',
        deck: 'treasure',
        type: 'tool',
        context: 'free'
    }
]