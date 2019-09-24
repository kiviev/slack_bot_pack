

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
}

module.exports = Helpers;
