

class Helpers{

	static getMentionString(user){
		return "<@" + user + ">";
	}

	static capitalize(string){
		return string.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
	}

	static testRegex(regex,string){
		return regex.test(string);
	}

  static getAbonoResultToNotificate(data){
    var str = '';
    for (var p in data) {
      if (data.hasOwnProperty(p)) {
        str += '- ' + p + ' -> ' + data[p] + '\n';
      }
    }
    return str;
  }
}

module.exports = Helpers;
