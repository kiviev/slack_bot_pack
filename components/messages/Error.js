const BaseMessage = require('./BaseMessage');


class Error extends BaseMessage{
	constructor(bot,data){
		super(bot,data);
    this.msg = data.msg;
    this.code = data.code;
    this.source = data.source;

    // if(!this.text) this.text = data.msg;
	}




}

module.exports = Error;
