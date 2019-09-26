const Helpers = require('../Helpers');
const BaseMessage = require('./BaseMessage');
const Scrap = require('abono-transportes-web-scraping');


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
		this.userMessage = data.user || null;
    this.user = this.getUserById(this.userMessage) || null;
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
    //
		this.onText(/abono/ig, this.abonoMessageCb.bind(this) , this.text)
	}

	async abonoMessageCb(d){
		console.log('ABONO match!!!!!!!!!', d)
    // console.log(this);
    let scrap = new Scrap(process.env.ABONO_NUM);
    await scrap.init().catch((res) => {
        console.log('Init Fail: ', res);
        // process.exit(1);
    });

    let result = await scrap.getResults().catch((res) => console.log('Result Fail: ' , res));
    if(result){
      let msg = 'Acho pijo ' + Helpers.getMentionString(this.user.name) + ' tu abono caduca el ' + result['Fecha de Caducidad'];
      // this.bot.postMessageToChannel('bot-for-home', msg,{});
      // console.log(this.getUserById(this.userMessage));
      this.bot.postMessageToUser(this.getUserName(), msg,{});
      // console.log(msg);

    }
    console.log(result);
    await scrap.close();
  }

getUserName(){
  return this.user.name;
}

getUserById(id) {
    return this.bot.users.filter((user) => {
        return user.id == id;
    })[0];
}

getChannelById(id) {
    return this.bot.channels.filter((channel) => {
        return channel.id == id;
    })[0];
}

}

module.exports = Message;
