import { bot } from "../../bot/src/bot.js";
import { subscribers, users } from "../../bot/src/db.js";

export async function notifySubscribers(log) {
    console.log("📨 Начинаю рассылку подписчикам...");

    const { qrData, userId, userName, timestamp } = log;

    const message =
        `📨 Кто-то взял ключ!\n\n` +
        `👤 Личность: ${userName}\n` +
        `🔑 Аудитория: ${qrData}\n` +
        `🕐 Время: ${new Date(timestamp).toLocaleString()}`;

    for (const chatId of subscribers) {
        try {
            await bot.telegram.sendMessage(chatId, message);
            console.log(`→ Уведомление отправлено ${chatId}`);
        } catch (err) {
            console.error(`❌ Ошибка отправки ${chatId}:`, err);
        }
    }

    console.log("📨 Рассылка завершена\n");
}