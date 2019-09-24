const Helpers = require('../Helpers');
const NullMessageType = require('./NullMessageType');



class MessageFactory {


	setData(bot,data) {
		this.bot = bot;
		this.data = data;
		this.type = this.data.type;
		this.error = null;
		this.instance = this.getInstance();
	}

	getInstance(){
		try {
			let Clase = Helpers.capitalize(this.type);
			let MsessageType = require('./' + Clase);
			return new MsessageType(this.bot,this.data)
		} catch (error) {
			console.error('Null Message Type' , this.type);
			return new NullMessageType(this.bot,this.data);

		}
	}

	handleMesssage(){
		console.log('message' ,this.data);
	}

	handleError(){
		console.log('errorcito', this.data);
	}

	handleOther(){
		console.log('other' ,this.data);

	}

}

module.exports = MessageFactory;