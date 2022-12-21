require("dotenv").config();
const app = require("./app");
const httpServer = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(httpServer);
const PORT = process.env.PORT || 3000;

io.on("connection", socket => {
    console.log("Connected");
});

httpServer.listen(PORT, () => console.log(`Server listening on port:${PORT}`));
