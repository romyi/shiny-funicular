import { WebSocketServer } from "ws";
import express from "express";
import cors from "cors";
import { Doors, Draw, Treasures } from "./src/deck.js";
import { Player } from "./src/player.js";
import { Game, Core } from "./src/core.js";
import { randomUUID } from "crypto";
import { cardlookup, config } from "./src/card_new.js";

const wss = new WebSocketServer({ port: 8000 });
const clients = {};
const draw = new Draw();
const tres = new Treasures(draw);
const doors = new Doors(draw);

const app = express();
app.use(cors());
const port = 3000;

const game = new Game("new game");
const core = new Core(game, config);

app.get("/game", (req, res) => {
  res.send({ title: game.name });
});

app.get("/players", (req, res) => {
  res.send({ players: core.players });
});

app.get("/deck", (req, res) => {
  res.send({
    stash: draw.cards.length,
    doors: doors.length,
    treas: tres.length,
  });
});

app.get("/me", (req, res) => {
  const { name } = req.query;
  const id = core.players.find((player) => player.name === name).id;
  res.send({
    id: id,
  });
});

app.get("/hand", (req, res) => {
  const { id } = req.query;
  let hand = [];
  if (id) hand = core.players.find((player) => player.id === id).hand;
  res.send({
    cards: hand,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const broadcast = (payload) => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(payload));
  });
};

const address = function(id, payload) {
  console.log(id)
  clients[id].send(JSON.stringify(payload))
}

core.bindask(() => console.log('from card'))

wss.on("connection", (ws) => {
  const uid = randomUUID();
  clients[uid] = ws;
  ws.on("message", (raw) => {
    const { type, payload, name } = JSON.parse(raw);
    if (type === 'join room') {
      clients[uid].player = new Player(name);
      core.players.push(clients[uid].player);
      broadcast({ entity: ["players", "me"]});
      // clients[uid].send({ script: 'invite_to_draft' })
      address(uid,{ script: 'inviteToDraft' })
      // core.players.hand.push(core.loots.pop());
      // cardlookup[core.doors[0].name].mechanics[0].action(core)
    }
    // if (type === "start_match") {
    //   for (let player of core.players) {
    //     player.inHand([...tres.take(1), ...doors.take(1)]);
    //   }
    //   broadcast({ entity: "hand" });
    // }
  });
  ws.on("close", () => {
    core.players = core.players.filter(
      (player) => player.id !== clients[uid].player.id
    );
    broadcast({ entity: "players" });
    delete clients[uid];
  });
});

//server
const mike = new Player('Mike')
core.players.push(mike)
//client
console.log(core)
mike.hand.push(core.loots.pop());
const activated = core.players[0].hand[0];
console.log(core)
//server
core.stash.push(activated);
mike.hand = mike.hand.filter((card) => card.id !== activated.id);
cardlookup[activated.name].mechanics[0].action(core)
console.log(core)
