const express = require("express");
const {Server,Socket} = require("socket.io");

const app = express();

const server = app.listen(3005,() => {
    console.log("server is running on port 3005");
})

const io = new Server(server);

io.on("connection",(socket : any) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("chatMessage", (message : string) => {
        io.emit("chatMessage", message);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });

    const isConnected = socket.connected;
    socket.emit('connectionStatus', isConnected);
});