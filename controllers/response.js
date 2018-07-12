class Response{

	constructor(template){
		if(template.includes('Sticker:')){
			this.sticker = template.substr(template.indexOf('Sticker:')+8);
			this.template = template.substr(0, template.indexOf('Sticker:'));
		}else{
			this.template = template;
		}
	}

	async send(ctx, target){
		
		if(this.template !== ''){
			await ctx.reply(this.format(target? ctx.target.member : ctx.member));
		}
		
		if(this.sticker){
			this.sendSticker(ctx);
		}
	}
	async reply(ctx, target){

		if(this.template !== ''){
			await ctx.reply(
				this.format(target? ctx.target.member : ctx.member),
				{reply_to_message_id: target? ctx.target.message_id : ctx.message.message_id}
			);
		}

		if(this.sticker){
			this.sendSticker(ctx);
		}
	}
	async sendSticker(ctx){
		return ctx.replyWithSticker(this.sticker);
	}

	format(member){

		let response = this.template.replace('{{full_name}}', member.full_name);
		response = response.replace('{{username}}', `@${member.username}`);

		return response;
	}
}

exports.Response = Response;