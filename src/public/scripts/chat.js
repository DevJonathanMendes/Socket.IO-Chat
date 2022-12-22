const socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

const username = document.getElementById("username").textContent;
const room = document.getElementById("room").textContent;

socket.emit("login", { username, room });

form.addEventListener("submit", event => {
    event.preventDefault();
    if (input.value) {
        socket.emit("chatMessage", input.value);
        input.value = "";
    };
});

socket.on("info", msg => {
    createMessage(msg, "info");
});

socket.on("message", obj => {
    const { id, username, msg } = obj;
    if (id === socket.id)
        createMessage(msg, "message current-user");
    else
        createMessage(`${username}: ${msg}`, "message");
});

const createMessage = (msg, className) => {
    const li = document.createElement("li");
    li.setAttribute("class", className)
    li.textContent = msg;
    messages.appendChild(li);
    messages.scrollTo(0, document.body.scrollHeight);
};