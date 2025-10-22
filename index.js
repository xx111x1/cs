const WebSocket = require("ws");
const axios = require("axios");
const PORT = 5000;
const wsServer = new WebSocket.Server({
    port: PORT,
});
wsServer.on("connection", function (socket, request) {
    socket.isOwner = false;
    console.log("connected");

    socket.on("message", function (msg) {
        const convert = JSON.parse(msg);

        if (convert.OWNER) {
            socket.isOwner = true;
        }

        wsServer.clients.forEach(function (client) {
            if (client.isOwner && convert.Fixer !== undefined) {
                client.send(msg);
            }
            if (!client.isOwner && (convert.melee || convert.chatting)) {
                client.send(msg);
            } else {
                client.send(msg);
            }
        });
    });
});
console.log(`WebSocket server running on port ${PORT}`);