const { Topic } = require('./controllers/topic');
const { Bouncer } = require('./controllers/bouncer');
const { Filter } = require('./controllers/filters');
const { Response } = require('./controllers/response');
const { AdminOnly, IgnoreAdmin } = require('./middlewares');

const bot = require('./libs/bot');
const log = require('./libs/log');

bot.command('reply', AdminOnly, async ctx => {

	const message = ctx.message.text.split('/reply ')[1];
	const reponse = new Response(message);

	reponse.reply(ctx, true);

});
bot.command('topic', AdminOnly, async ctx => {

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

let new_members_count = 0;
bot.on('new_chat_members', async ctx => {

	new_members_count++;
	if(new_members_count == 10){
		new_members_count = 0;
		console.log('send welcome message');
	}

	ctx.message.deleteMessage();	
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