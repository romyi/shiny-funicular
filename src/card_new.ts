import { Core } from "./core"

interface Mechanic {
    name: string
    action: (core: Core) => void
}

export interface Card {
    id: string
    name: string
    type: 'creature' | 'race' | 'effect' | 'item'
}

export interface Cardlookup {
    name: string
    type: 'creature' | 'race' | 'effect' | 'item'
    mechanics: Mechanic[]
}

class Damage implements Mechanic {
    name = 'deal_damage'
    action: (core: Core) => void
    constructor() {
        this.action = (core: Core) => {
            core.ask();
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
            core.ask();
        }
    }
}

export const config: Record<string, number> = {
    sword: 2,
    boobasour: 1
}

export const cardlookup: Record<string, Cardlookup> = {
    'sword': {
        name: 'sword',
        type: 'item',
        mechanics: [new Damage()]
    },
    'boobasour': {
        name: 'boobasour',
        type: 'creature',
        mechanics: [new Kill()]
    }
}