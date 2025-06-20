const express = require('express');
const app = express();
const http = require('http');
const cors=require("cors")
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin:"*"
    }
});
app.use(cors({ origin: "*" }));

io.on('connection', (socket) => {
socket.on("disconnect", () => {
    console.log("oh no user disconnected")
})


  console.log('a user connected');
});
server.listen(3000, () => {
  console.log('listening on *:3000');
});