'use strict';

import WebSocket = require('ws');
import models = require('../declarations/models');

var port: number = 3000;
var WebSocketServer = WebSocket.Server;
var server = new WebSocketServer({ port: port, headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "http://localhost:3000",
        "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS"
} });

server.on('connection', ws => {
	ws.on('message', message => {
		try {
			var userMessage: models.UserMessage = new models.UserMessage(message);
			broadcast(JSON.stringify(userMessage));
		} catch (e) {
			console.error(e.message);
		}
	});
});

function broadcast(data: string): void {
	server.clients.forEach(client => {
		client.send(data);
	});	
};

console.log('Server is running on port', port);