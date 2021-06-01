const http = require('http');
const WebSocket = require('./WebSocket');
const port = process.env.PORT || 9090;
const httpServer = http.createServer();
const io = require('socket.io')(
    httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
          }
    }
);
global.io = io;
io.on("connection", WebSocket.connection);

httpServer.listen(port, () => {
    console.log('Server is running on port: ' + port);
});
