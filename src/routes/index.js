const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("login", {
        title: "Login"
    });
});

router.get("/chat", (req, res) => {
    const { username, room } = req.query;
    if (username && room)
        res.render("chat", {
            title: "Chat",
            username: username,
            room: room
        });
    else
        res.redirect("/");
});

module.exports = router;
