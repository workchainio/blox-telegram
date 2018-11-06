const { URL } = require('url');
const { Topic } = require('./topic');
const { Bouncer } = require('./bouncer');
const { Keyword } = require('./keyword');
const { Filters, Whitelist } = require('../config');

const Cache = [];
const BanTopic = Topic.find('ban');
const WarnTopic = Topic.find('warn');

const WhitelistRegEx = Whitelist.map(data => new RegExp(data.toLowerCase()));

class Filter{

	constructor(data){

		this.del = data.del;
		this.ban = data.ban;
		this.external = data.external;
		this.delay = data.delay;

		this.topic = Topic.find(data.topic);
		this.keywords = data.keywords.map( data => {
			if(Array.isArray(data)){
				return data.map( data => new Keyword(data));
			}else{
				return new Keyword(data);
			}
		});

		Cache.push(this);
	}

	match(text){
		return this.keywords.reduce((result, keyword) => {

			if(Array.isArray(keyword)){
				return result && keyword.reduce( (result, sub_keyword) => {
					return result ||  sub_keyword.match(text);
				}, false) 
			}else{
				return result && keyword.match(text);
			}

		}, true);
	}

	async execute(ctx){

		const response = this.topic.getResponse();

		if(this.delay){
			await new Promise((resolve) => {
				setTimeout(resolve, this.delay * 1000);
			});
		}

		if(this.del){
			ctx.deleteMessage();
			await response.send(ctx);
		}else{
			await response.reply(ctx);
		}

		if (this.ban === 'ban') {
			Bouncer.ban(ctx);
		}

		if(this.ban === 'warn'){
			Bouncer.warn(ctx);
		}

	}

	static isExternal(message){

		if(!message.entities){
			return false;
		}

		const entities = message.entities
		.filter(
			entity => entity.type === 'url' || entity.type === 'text_link'
		)
		.map( 
			entity => {
				let text = message.text.substr(entity.offset, entity.length).toLowerCase();
				if(entity.type === 'text_link'){
					text = entity.url;
				}
				let url;

				WhitelistRegEx.forEach(whitelist => {
					if(whitelist.test(text)){
						text = 'workchain.io';
					}
				});

				try{
					url = new URL(text.toLowerCase());
				}catch(error){
					url = new URL('http://' + text.toLowerCase());
				}
				return url;
			}
		);

		return entities.reduce(
			(result, url) => {
				return result || !url.hostname.includes('workchain.io') 
			}, false
		)
	}

	static find(message){

		const text = message.text.toLowerCase();
		const external = this.isExternal(message);

		let match = Cache.reduce((result, filter) => {
			return result || (filter.match(text)? filter : null);
		}, null);

		if(match.external && !external){
			return null;
		}

		return match;
	}
}

//INIT:
Filters.map(data => new Filter(data));

exports.Filter = Filter;