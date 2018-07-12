const assert = require('assert');
const { Filter } = require('../controllers/filters');
const Messages = {
	link1: {
		text: 'What are you doing on test.io',
		entities: [ { offset: 22, length: 29, type: 'url'}]
	},
	link2: {
		text: 'What is this https://sport.blic.rs/svetsko-prvenstvo-u-fudbalu-rusija-2018/vise-od-igre-ono-sto-je-pol-pogba-uradio-posle-plasmana-francuske-u-finale-mundijala/3dvfwv6',
  		entities: [ { offset: 13, length: 154, type: 'url' } ]
	},
	link3: {
		text: 'I will try to fuck you https://aworker.io/?a=workchain.io using parameters.',
  		entities: [ { offset: 23, length: 34, type: 'url' } ]
	},
	link4: {
		text: 'What about first mention @ipetrovic and after that link https://aworker.io/?a=workchain.io',
  		entities: [ { offset: 25, length: 10, type: 'mention' },
			{ offset: 56, length: 34, type: 'url' } ]
	},
	link5: {
		text: 'What about first mention @ipetrovic and after that link https://workchain.io',
  		entities: [ { offset: 25, length: 10, type: 'mention' },
			{ offset: 56, length: 20, type: 'url' } ]
	},
	exchange1: {
		text: 'When is token going to be listed on exchange?',
  		entities: []
	},
	exchange2: {
		text: 'This token price is going to the moon on exchange!',
  		entities: []
	},
	exchange3: {
		text: 'I am going to dump my tokens on kucoin exchange!',
  		entities: []
	},
	exchange4: {
		text: 'What is token price?',
  		entities: []
	},
	bounty_start1: {
		text: 'When does this bounty starts?',
  		entities: []
	},
	bounty_start2: {
		text: 'When is bounty start date?',
  		entities: []
	},
	bounty_start3: {
		text: 'What is start date of bounty?',
  		entities: []
	},
	token_price1: {
		text: 'What is token ico price?',
  		entities: []
	},
	token_price2: {
		text: 'Why is token price on website $2?',
  		entities: []
	},
	token_price3: {
		text: 'Your page shows $2 price of token.',
  		entities: []
	}
};

describe('Running messages thru filters', function () {

	it('External url', async function () {

		let match =  Filter.find(Messages.link1);
		assert.equal(match.topic.name, 'external');

		match =  Filter.find(Messages.link2);
		assert.equal(match.topic.name, 'external');

		match =  Filter.find(Messages.link3);
		assert.equal(match.topic.name, 'external');

		match =  Filter.find(Messages.link4);
		assert.equal(match.topic.name, 'external');

		match =  Filter.find(Messages.link5);
		if (match) {
			assert.fail(`This is workchain.io link!`);
		}
	});

	it('Token exchange', async function (){

		let match =  Filter.find(Messages.exchange1);
		assert.equal(match.topic.name, 'exchange');

		match =  Filter.find(Messages.exchange2);
		assert.equal(match.topic.name, 'exchange');

		match =  Filter.find(Messages.exchange3);
		assert.equal(match.topic.name, 'exchange');

		match =  Filter.find(Messages.exchange4);
		if (match) {
			assert.fail(`This is ok message!`);
		}

	});

	it('Bounty starts', async function (){

		let match =  Filter.find(Messages.bounty_start1);
		assert.equal(match.topic.name, 'bounty_period');

		match =  Filter.find(Messages.bounty_start2);
		assert.equal(match.topic.name, 'bounty_period');

		match =  Filter.find(Messages.bounty_start3);
		assert.equal(match.topic.name, 'bounty_period');

	});

	it('Token price', async function (){

		let match =  Filter.find(Messages.token_price1);
		if (match) {
			assert.fail(`This is ok message!`);
		}
		
		match =  Filter.find(Messages.token_price2);
		assert.equal(match.topic.name, 'token_price');
		
		match =  Filter.find(Messages.token_price3);
		assert.equal(match.topic.name, 'token_price');
	});

});