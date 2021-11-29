const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const data = require("./data");

const app = express();
const cors = require("cors");
const User = require("./models/User");

const router = require("./routes");

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const socket = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH"],
  },
});

app.use(require("./routes")(socket));

socket.on("connection", (soc) => {
  soc.on("start", (id) => {
    const dto = data.filter((ob) => ob.assignedTo === id);
    soc.emit("start", dto);
  });

  soc.on("allUsers", () => {
    soc.emit("all", data);
  });

  soc.on("addUser", (obj) => {
    const { assignedTo, notes, priority, title } = obj;
    const user = new User(assignedTo, notes, priority, title);
    data.push(user);
    // soc.emit("add");
    soc.emit("all", data);
  });
  soc.on("create", () => {
    soc.emit("created a new user", "Hi there");
  });
});

socket.on("disconect", () => {
  console.log("disconected");
});

const socketApp = socket;
module.exports = socketApp;

server.listen(3005, () => console.log("server connnected"));
