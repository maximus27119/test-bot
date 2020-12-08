const { Telegraf } = require('telegraf');
const validator = require('validator');

const checkURLResponseStatus = require('./utils/checkURLResponseStatus');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Bot's start message
bot.start((ctx) => ctx.reply(`Welcome! You can enter any url to this bot to check it status.`));

// Url parsing process
bot.on('message', async (ctx) => {
    const input = ctx.message.text;
    
    // If url has some protocol
    const isUrlValid = validator.isURL(input, { protocols: ['http', 'https'], require_protocol: true });
    
    if (isUrlValid) {
        const result = await checkURLResponseStatus(input);
        ctx.reply(`${input}\n\nStatus code: ${result.statusCode || result.error}`);

    } else if (validator.isURL(input, { require_protocol: false })) { // if url doesn't have protocol then we make two request for every protocol    
        const httpCode = await checkURLResponseStatus(`http://${input}`);
        const httpsCode = await checkURLResponseStatus(`https://${input}`);

        ctx.reply(`${input}\n\nhttp code: ${httpCode.statusCode || httpCode.error}\n\nhttps code: ${httpsCode.statusCode || httpsCode.error}`);
    } else { // If validation has not been passed
        ctx.reply('Please, enter a valid url');
    }
});

module.exports = bot;