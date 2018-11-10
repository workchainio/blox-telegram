const { Topic } = require('./topic');

const BanTopic = Topic.find('ban_sticker');
const WarnTopic = Topic.find('warn_sticker');

class Bouncer{
	static warn(ctx, target){

		const member = target? ctx.target.member : ctx.member;
		if(member.admin){
			return;
		}
		
		if(member.warned){
			return this.ban(ctx, target);
		}

		member.warned = true;
		member.save();

		if(WarnTopic)
			WarnTopic.send(ctx, target);
	}

	static ban(ctx, target){

		const member = target? ctx.target.member : ctx.member;
		if(member.admin){
			return;
		}

		member.banned = true;
		member.save();

		setTimeout(() => {
			ctx.kickChatMember(member.id);
		}, 10000);

		if(BanTopic)
			BanTopic.send(ctx, target);
	}
}

exports.Bouncer = Bouncer;