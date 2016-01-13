var http = require('http');
var url = require('url');
var configService = require('./configService.js');
var emailService = require('./emailService.js');


var uwp = require("uwp");
uwp.projectNamespace("Windows");

var config = configService.getConfig();

var emailSender = emailService(config);

var gpioController = Windows.Devices.Gpio.GpioController.getDefault();
var pin = gpioController.openPin(config.pin);
pin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.output);


http.createServer(function (req, res) {
	//get the query string (https://nodejs.org/api/http.html#http_message_url)
	var queryObject = url.parse(req.url, true).query;
	console.log(queryObject);
	var pinValue;
	if (queryObject && queryObject.state) {
		
		if (queryObject.state.toUpperCase() === config.onState) {
			pinValue = Windows.Devices.Gpio.GpioPinValue.low;
			
			//start a timer and send a notification on time out
			setTimeout(function () {
				console.log('sending email');
				// send mail with defined emailSender object
				emailSender.sendEmail();
			}, 60 * 1000);
		}		
		else {
			pinValue = Windows.Devices.Gpio.GpioPinValue.high;
		}
		pin.write(pinValue);
	}
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('pin status is now: ' + pinValue);
}).listen(config.port);



