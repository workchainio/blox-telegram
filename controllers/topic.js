const { Response } = require('./response');
const { Topics } = require('../config');

const Cache = [];

class Topic{

	constructor(name, responses){
		this.name = name;
		this.responses = responses.map( resp => new Response(resp));
		Cache.push(this);
	}

	getResponse(){
		return this.responses[Math.floor(Math.random() * this.responses.length)];
	}
	async send(ctx, target){
		return this.getResponse().send();
	}
	async reply(ctx, target){
		return this.getResponse().reply();
	}

	static find(name){
		return Cache.reduce( (result, topic) => {
			return result || (topic.name === name? topic: null);
		}, null)
	}
}

//INIT:
Object.keys(Topics).forEach( key =>{
	Topics[key] = new Topic(key, Topics[key]);
});

exports.Topic = Topic;