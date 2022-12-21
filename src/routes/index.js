const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("login", {
        title: "Login"
    });
});

router.get("/chat", (req, res) => {
    if (req.query.username)
        res.render("chat", {
            title: "Chat",
            username: req.query.username
        });
    else
        res.redirect("/");
});

module.exports = router;
