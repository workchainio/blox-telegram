const { BOT_TOKEN, CHAT_ID } = require('../config');
const Telegraf = require('telegraf');

const { TargetMiddlware, MembersMiddlware, LockChat, 
	ParseEdited } = require('../middlewares');

const bot = new Telegraf(BOT_TOKEN);
bot.use(ParseEdited);
bot.use(LockChat(CHAT_ID));
bot.use(TargetMiddlware);
bot.use(MembersMiddlware);
bot.startPolling();

module.exports = bot;