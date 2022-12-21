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

socket.on("message", msg => {
    const text = document.createElement("li");
    text.textContent = msg;
    messages.appendChild(text);
    messages.scrollTo(0, document.body.scrollHeight);
});
