import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { users, subscribers } from "./db.js";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

console.log("\nБот заупскается.");

bot.start(async (ctx) => {
    const user = ctx.from;

    console.log(`Пользователь ${user.id} (${user.first_name}) вызвал /start`);

    if (!users.has(user.id)) {
        users.set(user.id, {
            telegramId: user.id,
            name: user.first_name ?? "Без имени"
        });

        console.log(`Зарегистрирован новый пользователь: ${user.id} ${user.first_name}`);
    } else {
        console.log(`Пользователь уже зарегистрирован: ${user.id}`);
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

    console.log(`Кнопка WebApp отправлена пользователю ${user.id}`);
});

bot.command("subscribe", (ctx) => {
    const user = ctx.from;

    subscribers.add(user.id);
    ctx.reply("Вы подписались на уведомления 💌");

    console.log(`[/subscribe] Пользователь ${user.id} (${user.first_name}) подписался`);
});

bot.command("unsubscribe", (ctx) => {
    const user = ctx.from;

    subscribers.delete(user.id);
    ctx.reply("Вы отписались от уведомлений 🔕");

    console.log(`[/unsubscribe] Пользователь ${user.id} (${user.first_name}) отписался`);
});

bot.on("text", (ctx) => {
    const user = ctx.from;
    const text = ctx.message.text;

    console.log(`[message] ${user.id} (${user.first_name}): ${text}`);
});

bot.catch((err, ctx) => {
    console.error("Ошибка в боте:", err);
    console.error("Context:", ctx);
});

bot.launch();
console.log("Бот запущен...");

export { bot };