import { randomUUID } from "crypto";

const prompt = require('prompt-sync')();


const Modes = ['Exploration', 'Interception', 'Idle'] as const;

type Mode = typeof Modes[number]

type Action = {
    take: (core: Core) => void
    revert: () => void
    name: string
    stash: any
    reverted: boolean
}

type Card = {
    name: string
    action: Action
    deck: 'do' | 'tr'
    kind: 'item' | 'effect' | 'mob' | 'race'
}

type Player = {
    name: string
    hits: number
}

type Core = {
    players: Player[]
    phase: Mode
    log: Action[]
}

const deckconfig = {
    kinggoblin: 1,
    goblin: 3,
    desireRing: 2
}

class GoDealDamage {
    name: string = 'deal damage'
    stash: { reciever?: string } = {}
    take: ((core: Core) => void)
    revert: (() => void) = () => {}
    reverted: boolean
    constructor(hits: number) {
        this.reverted = false
        this.take = (core: Core) => {
            let name: string;
                if (!this.stash.reciever) {
                    name = prompt('who recieves damage');
                } else {
                    name = this.stash.reciever
                }
                const player = core.players.find((player) => player.name === name);
                if (player) {
                    player.hits -= hits;
                    this.revert = function() {
                        console.log(this.reverted)
                        if (this.reverted) {
                            player.hits -= hits
                            core.log.push({...this, name: 'deal damage again', reverted: !this.reverted, stash: {reciever: name}})
                        } else {
                            player.hits += hits
                            core.log.push({...this, name: 'cancel damage', reverted: !this.reverted, stash: {reciever: name}})
                        }
                    }
                    core.log.push({...this, name: 'deal damage', reverted: this.reverted, stash: {reciever: name}})
                } else {
                    console.log('incorrect name. out')
                }
        }
    }
}

const cards: Record<string,Card> = {
    kinggoblin: {
        name: 'king goblin',
        deck: 'tr',
        kind: 'mob',
        action: new GoDealDamage(10)
    },
    goblin: {
        name: 'goblin',
        deck: 'do',
        kind: 'mob',
        action: new GoDealDamage(4)
    },
    desireRing: {
        name: 'dring',
        deck: 'tr',
        kind: 'item',
        action: {
            reverted: false,
            name: 'revert',
            stash: {},
            revert: () => {},
            take(core: Core) {
                if (core.log.length > 0) {
                    // console.log(core.log)
                    const effect = core.log.at(-1)
                    if (effect) {
                        // core.log.push({...this, name: `revert ${effect.name}`})
                        effect?.revert();
                    }
                } else {
                    console.log('nothing to deny')
                }
            },
        }
    }
}

class Deck {
    kart: Array<any> = []
    constructor(deckConfig: any) {
        console.log('a')
        Object.entries(deckConfig).forEach((entry: any) => {
            for (let i = 0; i < entry[1]; i++) {
                this.kart.push({
                    ...cards[entry[0]],
                    id: randomUUID()
                })
            }
        })
        // for (let cardname of deckConfig) {
        //     for (let index = 0; index < deckConfig[cardname]; index++) {
        //         console.log(cardname)
        //     }
        // }
    }
}

const plA: Player = {
    name: 'Rosh',
    hits: 10
}

const plB: Player = {
    name: 'Jaden',
    hits: 11
}

const plC: Player = {
    name: 'Tanette',
    hits: 12
}

const core: Core = {
    players: [plA, plB, plC],
    phase: 'Interception',
    log: []
}


console.log(plA.hits);
cards.goblin.action.take(core);
cards.desireRing.action.take(core);
cards.desireRing.action.take(core);
cards.kinggoblin.action.take(core);
cards.desireRing.action.take(core);



console.log(core.log)
console.log(plA.hits);
export {}