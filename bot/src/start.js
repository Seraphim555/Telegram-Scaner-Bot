import { bot } from "./bot.js";
import express from "express";
import { subscribers } from "./db.js";

console.log("\nБот запускается...");
bot.launch();
console.log("Бот запущен...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

const app = express();
app.use(express.json());

app.post("/notify", async (req, res) => {
    const log = req.body;

    if (!log.qrData || !log.userId) {
        return res.status(400).json({ error: "Invalid log data" });
    }

    const message =
        `📨 Кто-то взял ключ!\n\n` +
        `👤 Личность: ${log.userName || "Неизвестно"}\n` +
        `🔑 Аудитория: ${log.qrData}\n` +
        `🕐 Время: ${new Date(log.timestamp || Date.now()).toLocaleString()}`;

    for (const chatId of subscribers) {
        try {
            await bot.telegram.sendMessage(chatId, message);
            console.log(`→ Уведомление отправлено ${chatId}`);
        } catch (err) {
            console.error(`❌ Ошибка отправки ${chatId}:`, err);
        }
    }

    console.log("📨 Рассылка завершена\n");
    res.json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Bot API запущен на порту ${PORT}`));