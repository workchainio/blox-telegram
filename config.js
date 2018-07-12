exports.BOT_TOKEN = '542459509:AAFMp79dyRQPLzJX7IwY2Z12Hc-fy57gICs';
exports.CHAT_ID = -1001280467266;

exports.Topics = {
	token_price: [
		'Everything related to our token price is on our website: https://workchain.io/pricing'
	],
	exchange: [
		`Talking about token on exchange is forbidden.\nWe neither encourage or discourage the listing of our tokens on exchanges.`,

		`{{username}}, talking about token on exchange is forbidden.\nWe neither encourage or discourage the listing of our tokens on exchanges.`
	],
	bounty_period: [
		`Our bounty starts on Jun 23rd and ends 8 weeks after.\nEach week we will be celebrating best of the best bounty hunters :)`
	],
	bounty_details: [
		`We have one of the most valuable bountis on the market!\nEach week I will personally reward 5000 best bounty hunters.\nThey will all get their tokens at the end of week 8 and they will be eliagable for AirDrop as well.\nYou can join at: https://bounty.workchain.io`
	],
	ico: [
		`We are not running an ICO, we are creating real-use blockchain product, that will allow you to receive real-time payroll.\nOur token, WATT, is used to keep our ecosystem alive.\nDid you check out my workID? workchain.io/blox ;)`
	],
	external: [ 
		'Hey {{full_name}}, we have removed your message because it contains a link.'
	],
	hype: [
		`Hey {{full_name}}, lets keep it real.\nLove your enthusiasm and we are on something big!\nBut we will need some time to make real-time payroll reality!Sticker:CAADAQAD8gEAAhqwSw2ZRBzm5D7t-AI`
	],
	ban: [
		`Hey {{full_name}}, in the name of people, you shall not be part of this group anymore!Sticker:CAADAQAD8QEAAhqwSw3XKs7YvadyEgI`
	],
	warn: [
		`Hey {{full_name}}, I won't tolerate behaviour like this!Sticker:CAADAQAD8AEAAhqwSw0S9szwb8IURgI`
	],
	work_id: [
		`Hey {{full_name}}, you can checkout my workID here workchain.io/blox\nDo you have one?`
	],
	ban_sticker: [
		`{{username}}Sticker:CAADAQAD8QEAAhqwSw3XKs7YvadyEgI`
	],
	warn_sticker: [
		`{{username}}Sticker:CAADAQAD8AEAAhqwSw0S9szwb8IURgI`
	],
	warn_general: [
		'No-no'
	]
}

exports.Filters = [
	{
		keywords: ['token', ['exchange', 'listed', 'listing']],
		topic: 'exchange',
		del: false,
		ban: false,
		delay: 3
	},
	{
		keywords: ['bounty', ['start', 'end']],
		topic: 'bounty_period',
		del: false,
		ban: false,
		delay: 3
	},
	{
		keywords: ['bounty', ['win', 'rules', 'works', 'join']],
		topic: 'bounty_period',
		del: false,
		ban: false,
		delay: 3
	},
	{
		keywords: ['listing', 'token'],
		topic: 'exchange',
		del: false,
		ban: false,
		delay: 3
	},
	{
		keywords: ['token', ['price', 'cost'], ['website', 'page']],
		topic: 'token_price',
		del: false,
		ban: false,
		delay: 3
	},
	{
		keywords: ['ico', ['start', 'end', 'sale', 'whitelist']],
		topic: 'ico',
		del: false,
		ban: false,
		delay: 6
	},
	{
		keywords: [['moon', 'lambo', 'billion', 'whitelist']],
		topic: 'hype',
		del: false,
		ban: false,
		delay: 3
	},
	{
		keywords: [''],
		topic: 'external',
		del: true,
		ban: 'warn',
		external: true
	}
]