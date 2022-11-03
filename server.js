const express = require("express");

const app = express();

const http = require("http").Server(app);

io = require("socket.io")(http, {
  maxHttpBufferSize: 1e7,
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
});

http.listen(3002);
