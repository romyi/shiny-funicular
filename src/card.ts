export type DeckType = 'door' | 'treasure'
type Type = 'equipment' | 'creature' | 'tool' | 'class' | 'race'
type Context = 'skirmish' | 'free'

export interface Card {
    id: string;
    rank: number;
    deck: DeckType;
    name: string;
    type: Type;
    context: Context;
};

export const cards: Card[] = [
    {
        id: '1',
        rank: 11,
        deck: 'door',
        name: 'the Beast',
        type: 'creature',
        context: 'skirmish'
    },
    {
        id: '2',
        rank: 10,
        deck: 'treasure',
        name: 'sword of fate',
        type: 'tool',
        context: 'skirmish'
    },
    {
        id: '3',
        rank: 4,
        deck: 'door',
        name: 'Nightmare Creature',
        type: 'creature',
        context: 'skirmish'
    },
    {
        id: '4',
        rank: 20,
        deck: 'door',
        name: 'Void Mechatron',
        type: 'creature',
        context: 'skirmish'
    },
    {
        id: '5',
        rank: 14,
        deck: 'treasure',
        name: 'Strongbow of dreadnought',
        type: 'equipment',
        context: 'free'
    },
    {
        id: '6',
        rank: 2,
        deck: 'treasure',
        name: 'Boots of travel',
        type: 'equipment',
        context: 'free'
    },
    {
        id: '7',
        rank: 5,
        deck: 'treasure',
        name: 'Ring of desire',
        type: 'tool',
        context: 'free'
    }
]