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

let new_messages_count = 0;
let new_members_count = 0;
const AutoWelcomeTopic = Topic.find('auto_welcome');
bot.on('new_chat_members', async ctx => {
	ctx.deleteMessage();

	new_members_count++;
	if(new_members_count >= 25 && new_messages_count >= 7){
		new_members_count = 0;
		new_messages_count = 0;
		AutoWelcomeTopic.send(ctx);
	}	
});


bot.on('text', IgnoreAdmin, async ctx => {

	new_messages_count++;
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
