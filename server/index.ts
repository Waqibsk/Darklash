import "./types/socket";
import { Socket } from "socket.io";
import type { Room } from "./types/room";
import { createVerify } from "crypto";
const express = require('express');
const app = express();
const http = require('http');
const cors=require("cors")
const server = http.createServer(app);
const { Server } = require("socket.io");
const { randomUUID } = require('crypto');
const io = new Server(server, {
    cors: {
        origin:"*"
    }
});
app.use(cors({ origin: "*" }));

let rooms: { [id: string]: Room } = {};
const joinRoom = (socket:Socket, room:Room) =>{

  room.sockets.push(socket);
  socket.join(room.id)
}








io.on('connection', (socket:Socket) => {
socket.isPlaying=false



  socket.on("disconnect", () => {
      console.log("oh no user disconnected")
      if(socket.roomId){
        const roomId=socket.roomId;
        io.to(roomId).emit("disconnected");
        delete rooms[roomId]

      }
   console.log("all rooms",rooms)
  })
  socket.on("deleteRoom", (roomId:string) => {
    if (rooms[roomId]) {
      delete rooms[roomId];

      console.log("deleted room")
      return;
    }
    console.log("could not find the room")



})


  socket.on("createRoom", (cb) => {

    const room = {
      id: randomUUID(),
      sockets:[]
    }
    console.log("created room with id",room.id)
    rooms[room.id] = room;

    joinRoom(socket, room);

    socket.roomId = room.id;
    console.log("roomsize is this ", room.sockets.length);
    cb({ success: "true", roomId: room.id,size:room.sockets.length});
})
  
  socket.on('joinRoom', (roomId, cb) => {
    const room = rooms[roomId];
    if (!room) {
      console.error("room does not exist")
      return
    }
    if (room.sockets.length >= 2) {
      console.error("room full");
      return
    }
    
  
    joinRoom(socket, room);
 socket.roomId=roomId
    console.log("joined room ", room.id)
    console.log("room size ", room.sockets.length)
    
  cb({roomId,role:"enemy",size:room.sockets.length})

    if (room.sockets.length === 2) {
    io.to(room.id).emit("gameStarted");
  }
  })
  socket.on("updateFighters", (data1) => {
    socket.to(socket.roomId).emit("updatingFighters", data1);
})



  console.log('a user connected');
});





server.listen(3000, () => {
  console.log('listening on *:3000');
});