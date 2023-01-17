import { WebSocketServer } from 'ws';
import express from 'express';
import cors from 'cors';
import { Doors, Draw, Treasures } from './src/deck.js';
import { Player } from './src/player.js';
import { Game, Core } from './src/core.js';
import { randomUUID } from 'crypto';

const wss = new WebSocketServer({port: 8000});
const clients = {};
const draw = new Draw()
const tres = new Treasures(draw);
const doors = new Doors(draw);

const app = express();
app.use(cors())
const port = 3000

const game = new Game('new game');
const core = new Core(game);


app.get('/game', (req, res) => {
  res.send({ title: game.name })
})

app.get('/players', (req, res) => {
  console.log(core.players)
  res.send({ players: core.players })
})

app.get('/deck', (req, res) => {
  res.send({ 
    stash: draw.cards.length, 
    doors: doors.length, 
    treas: tres.length 
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const broadcast = (payload) => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(payload))
  })
}

wss.on("connection", (ws) => {
  const uid = randomUUID();
  clients[uid] = ws;
  console.log(Object.entries(clients).length);
  ws.on('message', (raw) => {
    const { type, payload, name } = JSON.parse(raw);
    if (type === 'connect') {
      clients[uid].player = new Player(name);
      core.players.push(clients[uid].player);
      console.log(core.players);
      broadcast({ entity: 'players' })
    }
  })
  ws.on('close', () => {
    console.log('closed')
    core.players = core.players.filter((player) => player.id !== clients[uid].player.id);
    broadcast({ entity: 'players' })
    delete clients[uid]
  })
})

