const Message = require('./Message');


class Desktop_notification extends Message{

  constructor(bot,data){
    super(bot,data);
    this.title = data.title;
    this.subtitle = data.subtitle;
    this.msg = data.msg;
    this.content = data.content;
    this.launchUri = data.launchUri;
    this.avatarImage = data.avatarImage;
    this.ssbFilename = data.ssbFilename;
    this.imageUri = data.imageUri;
    this.is_shared = data.is_shared;
    this.is_channel_invite = data.is_channel_invite;
  }

}

module.exports = Desktop_notification;
