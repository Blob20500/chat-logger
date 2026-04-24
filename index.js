const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const WEBHOOK_URL = process.env.WEBHOOK_URL;

if (!WEBHOOK_URL) {
    console.error("Webhook URL not set!");
}

app.post("/chatlog", async (req, res) => {
    const { username, message, userId } = req.body;

    const embed = {
        title: "Chat Log",
        color: 3447003, // blue
        fields: [
            {
                name: "Username",
                value: username || "Unknown",
                inline: true
            },
            {
                name: "User ID",
                value: userId ? String(userId) : "N/A",
                inline: true
            },
            {
                name: "Message",
                value: message || "None",
                inline: false
            }
        ],
        timestamp: new Date().toISOString()
    };

    try {
        await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                embeds: [embed]
            })
        });

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running"));
