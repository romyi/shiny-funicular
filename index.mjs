import { WebSocketServer } from 'ws';
import { Doors, Draw, Treasures } from './src/deck.js';
import { Player } from './src/player.js';
import { randomUUID } from 'crypto';

const wss = new WebSocketServer({port: 8000});
const clients = {};
const draw = new Draw()
const tres = new Treasures(draw);
const doors = new Doors(draw);
wss.on("connection", (ws) => {
  const uid = randomUUID();
  clients[uid] = ws;
  clients[uid].player = new Player(uid);
  ws.send(JSON.stringify({tres: tres.length, doors: doors.length, stash: draw.cards.length}))
  ws.on('message', (raw) => {
    const {type, payload } = JSON.parse(raw);
    if (type === 'pick') {
      clients[uid].player.inHand([...doors.take(1), ...tres.take(1)]);
      clients[uid].send(JSON.stringify({cards: clients[uid].player.hand}))
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({tres: tres.length, doors: doors.length, stash: draw.cards.length}))
      })
    }
    if (type === 'draw_card') {
      const { id } = payload;
      draw.put([clients[uid].player.hand.find((card) => card.id === id)]);
      clients[uid].player.hand = clients[uid].player.hand.filter((card) => card.id !== id);
      ws.send(JSON.stringify({cards: clients[uid].player.hand, tres: tres.length, doors: doors.length, stash: draw.cards.length}))
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({tres: tres.length, doors: doors.length, stash: draw.cards.length}))
      })
    }
  })
  ws.on('close', () => {
    delete clients[uid]
  })
})

