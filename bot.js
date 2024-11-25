const { Telegraf } = require('telegraf');
const config = require('./config');
const { generateDrawing } = require('./gpt');
const { compileLatex } = require('./latex');
const fs = require('fs');

const bot = new Telegraf(config.bot.token, {
  handlerTimeout: 1000
})

bot.start(async (ctx) => {
    await ctx.reply(`Приветствую вас, ${ctx.from.first_name}!
Я бот, основанный на технологии ChatGPT. С радостью отвечу на ваши вопросы и обогащу наше общение умными и интересными ответами. Пожалуйста, напишите мне свой вопрос или просто начните диалог!`, {
        reply_markup: {
            keyboard: [
                ['Генерация чертежа']
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
});

bot.on('message', async (ctx) => {
	if (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
        return;
    }
	
    const userTask = ctx.message.text;

    try {
        if (ctx.message.text.toLowerCase() === 'генерация чертежа') {
            await ctx.reply('Пожалуйста, опишите, какой географический чертеж вы хотите сгенерировать.');
            return;
        }

        await ctx.reply('Генерация чертежа началась. Пожалуйста, подождите немного...');

        const latexCode = await generateDrawing(userTask);
        fs.writeFileSync(config.latex.texFilePath, latexCode);  
		
        const pdfPath = await compileLatex();

        await ctx.replyWithDocument({ source: pdfPath });

        fs.unlinkSync(config.latex.texFilePath); 
        fs.unlinkSync(pdfPath); 
        return;
		
    } catch (error) {
        await ctx.reply('Произошла системная ошибка. Попробуйте перефразировать текст задачи и отправить снова!');
        await bot.telegram.sendMessage(config.group.id, `Ошибка: ${error.message}`);
    }
});


bot.launch().then(() => {}).catch((error) => {});
bot.catch((error) => {});