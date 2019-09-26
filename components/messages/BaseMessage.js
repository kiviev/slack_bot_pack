const Helpers = require('../Helpers');


class BaseMessage {

	constructor(bot,data){
		this.name = this.constructor.name;
		this.bot = bot;
		this.setProperties(data);
		// this.setActions()
    console.log('Mesage Type: ' , this.name);
	}

	setProperties(data){
		this.type = data.type || null;
		this.text = data.text || null;
		this.user = data.user || null;
		this.team = data.team || null;
		this.channel = data.channel || null;
		this.ts = data.ts || null;
	}

	setActions(){
		if(this.subtype){
			try {
				eval('this.'+ this.subtype + '().bind(this);') ;
			} catch (error) {
				console.error(error);
			}
		}else {
			this.handleActionFromMessage();
		}
	}

	onText(regex,cb){
    if(!this.text) return;
		if(this.text && Helpers.testRegex(regex,this.text)){
			if(typeof cb == 'function'){
				cb(arguments[2]);
			}
		}
		else{
			if(process.env.DEBUG == 'true'){
				console.error('Texto ' + this.text , ' No concuerda con regex ' + regex);
			}
		}
	}

	handleActionFromMessage(){}


	// subtype actions
  message_deleted() {
    // console.log(this);

    console.log('message Deleted: ');
  }


  bot_message() {
    // console.log(this);

    console.log('Subtype: bot_message : ');
  }



}

module.exports = BaseMessage;
