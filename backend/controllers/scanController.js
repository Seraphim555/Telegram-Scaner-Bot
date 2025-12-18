import { notifySubscribers } from "../utils/notify.js";
import { scanLogs } from "../db.js";

export async function handleScanEvent(req, res) {
    const { qrData, userId, userName, timestamp } = req.body;

    console.log("Получено событие сканирования:", req.body);

    if (!qrData || !userId) {
        console.warn("Неверные данные при сканировании");
        return res.status(400).json({ error: "Invalid data" });
    }

    const log = {
        qrData,
        userId,
        userName,
        timestamp: timestamp || Date.now()
    };

    scanLogs.push(log);

    await notifySubscribers(log);

    return res.json({ status: "ok" });
}