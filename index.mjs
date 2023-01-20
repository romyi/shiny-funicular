import { WebSocketServer } from "ws";
import express from "express";
import cors from "cors";
import { Doors, Draw, Treasures } from "./src/deck.js";
import { Player } from "./src/player.js";
import { Game, Core } from "./src/core.js";
import { randomUUID } from "crypto";

const wss = new WebSocketServer({ port: 8000 });
const clients = {};
const draw = new Draw();
const tres = new Treasures(draw);
const doors = new Doors(draw);

const app = express();
app.use(cors());
const port = 3000;

const game = new Game("new game");
const core = new Core(game);

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

wss.on("connection", (ws) => {
  const uid = randomUUID();
  clients[uid] = ws;
  ws.on("message", (raw) => {
    const { type, payload, name } = JSON.parse(raw);
    if (type === "connect") {
      clients[uid].player = new Player(name);
      core.players.push(clients[uid].player);
      broadcast({ entity: ["players", "me"], script: "startBouncing" });
    }
    if (type === "start_match") {
      for (let player of core.players) {
        player.inHand([...tres.take(1), ...doors.take(1)]);
      }
      broadcast({ entity: "hand" });
    }
  });
  ws.on("close", () => {
    core.players = core.players.filter(
      (player) => player.id !== clients[uid].player.id
    );
    broadcast({ entity: "players" });
    delete clients[uid];
  });
});
