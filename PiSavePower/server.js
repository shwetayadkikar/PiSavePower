var http = require('http');
var url = require('url');

var uwp = require("uwp");
uwp.projectNamespace("Windows");

var gpioController = Windows.Devices.Gpio.GpioController.getDefault();
var pin = gpioController.openPin(5);
pin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.output);


http.createServer(function (req, res) {
	//get the query string (https://nodejs.org/api/http.html#http_message_url)
	var queryObject = url.parse(req.url, true).query;
	console.log(queryObject);
	var pinValue;
	if (queryObject && queryObject.state) {
		
		if (queryObject.state.toUpperCase() === "ON") {
			pinValue = Windows.Devices.Gpio.GpioPinValue.low;
		}
		else {
			pinValue = Windows.Devices.Gpio.GpioPinValue.high;
		}
		pin.write(pinValue);
	}	
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('pin status is now: ' + pinValue);
}).listen(1337);



