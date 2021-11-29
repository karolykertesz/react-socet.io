const express = require("express");
const router = express.Router();
const sockets = require("./index");
const data = require("./data");
const User = require("./models/User");
module.exports = function (socket) {
  router.post("/app", async (req, res) => {
    const { assignedTo, title, priority, notes } = req.body;

    const user = new User(assignedTo, title, priority, notes);
    await data.push(user);
    socket.emit("all", data);
    res.json(user);
  });
  router.get("/app", async (req, res) => {
    const id = req.query.id;
    data.filter((u) => u.id !== +id);
    socket.emit("add");
    console.log(data);

    res.json(id);
  });
  router.post("/app/update", async (req, res) => {
    const id = req.query.id;
    const index = data.findIndex((ui) => ui.id === +id);
    const updated = Object.assign(data[index], req.body);
    data[index] = updated;
    socket.emit("all", data);

    res.json(updated);
  });
  return router;
};
