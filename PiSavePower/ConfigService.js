var fs = require('fs');

exports.getConfig = function () {
	var config = fs.readFileSync("config.json");
	
	var jsonConfig = JSON.parse(config);
	return jsonConfig;
}
