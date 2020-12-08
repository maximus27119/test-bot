// Entry point

// Configuration
const dotenv = require('dotenv');
dotenv.config();

// Instance of bot
const bot = require('./bot');

// Starting the bot
bot.launch()
    .then(() => console.log('Bot launched successfully!'))
    .catch(e => console.log(`Failed to launch bot ${e.toString()}`));