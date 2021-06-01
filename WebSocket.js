const websites = [];
class Websocket {
    connection(socket) {
        console.log('User connected successfully: ', socket.id);

        socket.on('join', (data) => {
            socket.join(data.url);
            console.log(socket.rooms);
            socket.to(data.url).emit("new_user", {count: io.sockets.adapter.rooms.get(data.url).size});
            console.log(`users in ${data.url}: `, io.sockets.adapter.rooms.get(data.url).size);
        });

        io.of("/").adapter.on("join-room", (room, id) => {
            console.log(`socket ${id} has joined room ${room}`);
        });

        io.of("/").adapter.on("leave-room", (room, id) => {
            console.log(`socket ${id} has leaved room ${room}`);
            socket.to(room).emit("new_user", {count: io.sockets.adapter.rooms.get(room).size});
        });

        socket.on('disconnect', () => {
            console.log('user disconnected: ', socket.id);
        });
    }
}

module.exports = new Websocket();