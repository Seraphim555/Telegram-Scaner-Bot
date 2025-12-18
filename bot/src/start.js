import { bot } from "./bot.js";

console.log("\nБот заупскается.");
bot.launch();
console.log("Бот запущен...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));