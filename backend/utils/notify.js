import fetch from "node-fetch";

const BOT_SERVICE_URL = "http://192.168.1.74:4000/notify";

export async function notifySubscribers(log) {
    try {
        console.log("📨 Отправка уведомления боту...");

        await fetch(BOT_SERVICE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(log)
        });

        console.log("✅ Лог успешно отправлен боту");
    } catch (err) {
        console.error("❌ Ошибка при отправке уведомления боту:", err);
    }
}