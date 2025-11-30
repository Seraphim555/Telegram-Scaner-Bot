import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { users } from "./db.js";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
    const user = ctx.from;

    if (!users.has(user.id)) {
        users.set(user.id, {
            telegramId: user.id,
            name: user.first_name ?? "Без имени"
        });
    }

    await ctx.reply(
        `Привет, ${user.first_name}! 👋
Я бот для учета ключей.

Нажми кнопку ниже, чтобы открыть сканер 👇`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Открыть сканер",
                            web_app: {
                                url: process.env.WEBAPP_URL
                            }
                        }
                    ]
                ]
            }
        }
    );
});

bot.launch();
console.log("Бот запущен");