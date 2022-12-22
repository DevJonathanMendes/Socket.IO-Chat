require("dotenv").config();
const app = require("./app");
const httpServer = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(httpServer);
const PORT = process.env.PORT || 3000;

const { addUser, getCurrentUser, deleteUser } = require("./utils/users");

io.on("connection", socket => {
    socket.on("login", ({ username, room }) => {
        const user = addUser(socket.id, username, room);

        socket.join(user.room);

        socket.broadcast
            .to(user.room)
            .emit("info", `${user.username} joined the chat`);

        socket.on("chatMessage", msg => {
            const user = getCurrentUser(socket.id);
            io.to(user.room).emit("message", { ...user, msg: msg });
        });

        socket.on("disconnect", () => {
            const user = deleteUser(socket.id);

            if (user)
                io.to(user.room)
                    .emit("info", `${user.username} left`);
        });
    });
});

httpServer.listen(PORT,
    () => console.log(`Server listening on port:${PORT}`));
