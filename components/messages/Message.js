const Helpers = require('../Helpers');
const BaseMessage = require('./BaseMessage');


class Message extends BaseMessage{

	constructor(bot,data){
		super(bot,data);
		this.setActions()
	}

	setProperties(data){
		this.subtype = data.subtype || null;
		this.client_msg_id = data.client_msg_id || null;
		this.type = data.type || null;
		this.text = data.text || null;
		this.suppress_notification = data.suppress_notification || null;
		this.user = data.user || null;
		this.team = data.team || null;
		this.user_team = data.user_team || null;
		this.channel = data.channel || null;
		this.event_ts = data.event_ts || null;
		this.ts = data.ts || null;
	}

	setActions(){
		if(this.subtype){
			try {
				eval('this.'+ this.subtype + '();') ;
			} catch (error) {
				console.error(error);
			}
		}else {
			this.handleActionFromMessage();
		}
	}

	handleActionFromMessage(){
		// this.onText(/^houron(.+)/, ()=> console.log('xxxxxxxxxx match!!!!!!!!!'))
		this.onText(/houron/, this.houronMessageCb.bind(this) , this.text)
	}

	houronMessageCb(d){
		console.log('HOURON match!!!!!!!!!', d)
	}




}

module.exports = Message;