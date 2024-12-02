const { Telegraf } = require('telegraf');
const config = require('./config');
const { generateDrawing } = require('./gpt');
const { compileLatex } = require('./latex');
const fs = require('fs');

const bot = new Telegraf(config.bot.token, {
  handlerTimeout: 5000
})

bot.start(async (ctx) => {
    await ctx.reply(`Приветсвую, ${ctx.from.first_name}! Нажми кнопку "Генерация чертежа", чтобы создать чертеж для задачи`, {
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
            await ctx.reply('Пожалуйста, опишите, какой геометрический чертеж вы хотите сгенерировать.');
            return;
        }

        await ctx.reply('Генерация чертежа началась. Пожалуйста, подождите немного...');

        const userId = ctx.from.id;
        const texFileName = `./filePlan/plan_${userId}.tex`;
        const pdfFileName = `./filePlan/plan_${userId}.pdf`;

        const latexCode = await generateDrawing(userTask, texFileName);
        await compileLatex(texFileName, pdfFileName);

        await Promise.all([
            ctx.replyWithDocument({ source: pdfFileName }),
            bot.telegram.forwardMessage(config.group.id, ctx.message.chat.id, ctx.message.message_id),
            bot.telegram.sendDocument(config.group.id, { source: pdfFileName })
        ]);		

        fs.unlinkSync(texFileName); 
        fs.unlinkSync(pdfFileName); 
        return;
		
    } catch (error) {
        await ctx.reply('Произошла системная ошибка. Попробуйте перефразировать текст задачи и отправить снова!');
        await bot.telegram.sendMessage(config.group.id, `Ошибка: ${error.message}`);
    }
});


bot.launch().then(() => {}).catch((error) => {});
bot.catch((error) => {});