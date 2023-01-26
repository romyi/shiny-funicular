import { Core } from "./core"

interface Mechanic {
    name: string
    action: (core: Core) => void
}

export interface Card {
    id: string
    name: string
    type: 'creature' | 'race' | 'effect' | 'item'
    description: string
}

interface CreatureCard extends Card {
    tier: number
    reward: number
}

interface ItemCard extends Card {
    price: number
    size?: 'big'
    hands?: 1 | 2
}

class Damage implements Mechanic {
    name = 'deal_damage'
    action: (core: Core) => void
    constructor() {
        this.action = (core: Core) => {
            core.ask({ script: 'highlight' });
        }
    }
}

class PhaseSwitch implements Mechanic {
    name = 'phase_switch'
    action: (core: Core) => void
    constructor() {
        this.action = (core: Core) => {
            core.phase = 'skirmish'
        }
    }
}

class Kill implements Mechanic {
    name = 'kill'
    action: (core: Core) => void;
    constructor() {
        this.action = (core: Core) => {
            console.log(this);
            core.ask({ script: 'yo' });
        }
    }
}

const switchToSkirmish = new PhaseSwitch();
const dealDamage = new Damage();

export const config: Record<string, number> = {
    sword: 5,
    boobasour: 5
}

type CardBluePrint<T> = Omit<T, "id"> & {mechanics: Mechanic[]}
export type BluePrints = CardBluePrint<CreatureCard> | CardBluePrint<ItemCard>

export const cardlookup: Record<string, BluePrints> = {
    'sword': {
        name: 'sword',
        type: 'item',
        mechanics: [dealDamage],
        description: 'aa',
        price: 100
    },
    'boobasour': {
        name: 'boobasour',
        type: 'creature',
        mechanics: [switchToSkirmish],
        tier: 3,
        reward: 1,
        description: 'aa'
    }
}