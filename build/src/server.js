'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = require("ws");
var models = require("../declarations/models");
var port = 3000;
var WebSocketServer = WebSocket.Server;
var server = new WebSocketServer({ port: port, headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "http://localhost:3000",
        "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS"
    } });
server.on('connection', function (ws) {
    ws.on('message', function (message) {
        try {
            var userMessage = new models.UserMessage(message);
            broadcast(JSON.stringify(userMessage));
        }
        catch (e) {
            console.error(e.message);
        }
    });
});
function broadcast(data) {
    server.clients.forEach(function (client) {
        client.send(data);
    });
}
;
console.log('Server is running on port', port);
