const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

dice_regex = /(\d+)?d(\d+)\s*(([+\-*])\s*(\d+))?/i

client.on('message', msg => {
	if (!msg.content.startsWith(config.prefix)) return;
	content = msg.content.substring(1);
	if (dice_match = content.match(dice_regex)) {
		
		number_of_dice = Number(dice_match[1]) || 1;
		type_of_dice = Number(dice_match[2]);

		res = 0;
		individual = '';
		for (i = 0; i < number_of_dice; i++) {
			die = Math.floor(Math.random() * type_of_dice) + 1;
			res += die;
			individual += ', ' + die;
		}
		individual = individual.substring(2);

		if (dice_match[3]) {
			switch (dice_match[4]) {
				case '+':
					res += Number(dice_match[5]);
					break;
				case '-':
					res -= Number(dice_match[5]);
					break;
				case '*':
					res *= Number(dice_match[5]);
					break;
			}
		}

		response = `You rolled a ${res}!`;
		if (number_of_dice > 1) response += ` (${individual})`;
		msg.reply(response);
	} else if (content === 'ping') {
		msg.reply('pong');
	}
});

client.login(config.token);

