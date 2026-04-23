const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const WEBHOOK_URL = "https://discord.com/api/webhooks/1496810301432004752/ORZ5oyeQS4vuAjAz5r67i2U4nKS8DF4kKP1doRUDqUMteX09Hk0Rq_2B3yKeVgC85e8g";

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
