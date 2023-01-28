import { randomUUID } from "crypto"

const shuffleDeck = (array: DeckCard[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  

class Player {
    id: string
    name: string
    hand: DeckCard[]
}

class Core {
    players: Player[] = []
    deck: DeckCard[] = []
    stage: string
    constructor() {
        this.stage = 'A'
    }
    generateCards(deckconfig, lookup) {
        for (let [name, q] of Object.entries<number>(deckconfig)) {
            const settings = lookup[name];
            console.log(settings)
            if (settings.type === 'item') {
                for (let i = 0; i < q; i++) {
                    let card = new ItemCard(settings.name, settings.play, settings.config)
                    this.deck.push(card)
                }
            }
            if (settings.type === 'creature') {
                for (let i = 0; i < q; i++) {
                    let card = new CreatureCard(settings.name, settings.play, settings.config)
                    this.deck.push(card)
                }
            }
        }
    }
    shuffle() {
        shuffleDeck(this.deck);
    }
    act(card: Card, id: string) {
        card.play(this, id)
    } 
}

interface IItemCard {
    id: string
    name: string
    type: 'item'
    config: {
        cost: number
    }
    play: (core: Core, id: string) => void
}

interface ICreatureCard {
    id: string
    name: string
    type: 'creature'
    config: {
        tier: number
    }
    play: (core: Core, id: string) => void
}

type DeckCard = ICreatureCard | IItemCard

abstract class Card {
    id: string
    name: string
    play: (core: Core, plId: string) => void
    constructor(name: string, play: (core: Core, id: string) => void) {
        this.name = name
        this.id = randomUUID();
        this.play = play
    }
}

class ItemCard extends Card implements IItemCard {
    type: 'item'
    config: {cost: number}
    constructor(name: string, play: (core: Core, id: string) => void, itemconfig: {cost: number}) {
        super(name, play)
        this.config = itemconfig
    }
}


class CreatureCard extends Card implements ICreatureCard {
    type: 'creature'
    config: {tier: number}
    constructor(name: string, play: (core: Core, plId: string) => void, creaturecinfig: {tier: number}) {
        super(name, play)
        this.config = creaturecinfig
    }
}

type CardBlueprints = Record<string, Omit<IItemCard, 'id'> | Omit<ICreatureCard, 'id'>>

const table: CardBlueprints = {
    'tool of fame': {
        type: 'item',
        name: 'tool of fame',
        config: {
            cost: 4
        },
        play: (core: Core, id: string) => {
            console.log(id, core.players)
            if (core.players[0].hand[0].type === 'item') core.players[0].hand[0].config.cost
        }
    },
    'chel': {
        type: 'creature',
        name: 'chel',
        config: {
            tier: 1
        },
        play: (core: Core, id: string) => {
            console.log(id, core.stage)
        }
    }
}

const deck = {
    'tool of fame': 5,
    'chel': 5
}

const game = new Core();
game.generateCards(deck, table)
game.shuffle()
console.log(game.deck)

export {}