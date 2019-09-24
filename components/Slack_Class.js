const SlackBot = require('slackbots');
const MessageFactory = require('./messages/MessageFactory');



class Slack_Class {

	constructor(botname = '') {
		if (process.env['SLACK_TOKEN_BOT_' + botname.toUpperCase()]) {
			this.bot = new SlackBot({
					token: process.env['SLACK_TOKEN_BOT_' + botname.toUpperCase()],
					name: botname
				});
			if (this.bot) this.init = true;
			else return false;
			this.botname = botname;

		}

	}

	initBot() {
		if (!this.init) return false;
		console.log(this);
		this.setEvents();
	}


	sendMessageChannel(msg, channel = 'general', params = {}) {
		this.bot.postMessageToChannel(channel, msg, params);
	}

	sendMessageToUser(msg, user, params = {}) {
		this.bot.postMessageToUser(user, msg, params);
	}

	sendMessageToGroup(msg, group, params = {}) {
		this.bot.postMessageToUser(group, msg, params);
	}

	setEvents(){
		this.bot.on('start', this.startCb.bind(this) );
		this.bot.on('message', this.messageCb.bind(this) );
		this.bot.on('open', this.openCb.bind(this) );
		this.bot.on('close', this.closeCb.bind(this) );
		this.bot.on('error', this.errorCb.bind(this) );
	}
	// Callback events
	startCb() {
		console.log('Start');
		this.sendMessageChannel("Bot " + this.botname + " encendido");
	}

	messageCb(data) {
		console.log('messageCb');
		this.message = new MessageFactory();
		this.message.setData(this.bot,data);
	}

	openCb() {
		console.log('Open');
	}

	closeCb() {
		console.log('close');
	}

	errorCb(error) {
		console.error('error: ' , error);
	}
}

module.exports = Slack_Class;