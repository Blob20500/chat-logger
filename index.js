const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const WEBHOOK_URL = "PASTE YOUR DISCORD WEBHOOK HERE";

app.post("/chatlog", async (req, res) => {
    const { username, message } = req.body;

    const content = `**Chat Logger**

Username: ${username}
Message: ${message}`;

    try {
        await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content })
        });

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running"));
