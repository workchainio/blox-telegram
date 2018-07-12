const { Topic } = require('./controllers/topic');
const { Bouncer } = require('./controllers/bouncer');
const { Filter } = require('./controllers/filters');
const { AdminOnly, IgnoreAdmin } = require('./middlewares');

const bot = require('./libs/bot');
const log = require('./libs/log');


bot.command('respond', AdminOnly, async ctx => {

	const [cmd, topicName] = ctx.message.text.split(' ');
	const topic = Topic.find(topicName);
	
	if(topic){
		topic.getResponse().reply(ctx, true);
	}
});
bot.command('warn', AdminOnly, async ctx => {

	const [cmd, topicName] = ctx.message.text.split(' ');
	const topic = Topic.find(topicName);
	
	if(topic){
		topic.getResponse().reply(ctx, true);
	}

	Bouncer.warn(ctx, true);
});
bot.command('ban', AdminOnly, async ctx => {

	const [cmd, topicName] = ctx.message.text.split(' ');
	const topic = Topic.find(topicName);
	
	if(topic){
		topic.getResponse().reply(ctx, true);
	}

	Bouncer.ban(ctx, true);
});

bot.on('text', IgnoreAdmin, async ctx => {

	const filter = Filter.find(ctx.message);
	if(filter){
		filter.execute(ctx);
		log.info(`${ctx.message.text} - ${filter.topic.name}`);
	}
	
});
bot.on('edited_message', IgnoreAdmin, async ctx => {

	const filter = Filter.find(ctx.message);
 	if(filter){
		filter.execute(ctx);
	}
	log.info(`${ctx.message.text} - ${filter.topic.name}`);
});
bot.on('sticker', async ctx => {
	console.log('Sticker:', ctx.update.message.sticker.set_name, ctx.update.message.sticker.file_id);
});