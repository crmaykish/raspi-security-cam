var express = require('express');
var app = express();
var path = require("path");

var five = require("johnny-five");
var board = new five.Board();

var pan_servo;
var tilt_servo;

board.on("ready", function() {
	tilt_servo = new five.Servo({
		pin: 5,
		center: true
	});

	pan_servo = new five.Servo({
		pin: 6,
		center: true
	});

	console.log("Arduino is ready.");
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/cam.html'));
});

app.get('/move/:direction', function(req, res){
	var dir = req.params.direction;

	if (dir == 'down'){
		tilt_servo.to(tilt_servo.position + 2);
	}
	
	if (dir == 'up'){
		tilt_servo.to(tilt_servo.position - 2);
	}
	
	if (dir == 'left'){
		pan_servo.to(pan_servo.position + 2);
	}
	
	if (dir == 'right'){
		pan_servo.to(pan_servo.position - 2);
	}
	
	res.send("Position: " + pan_servo.position + ", " + tilt_servo.position);
});

app.listen(3000, function () {
	console.log('Web server active.');
});
